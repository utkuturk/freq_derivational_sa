# HSP Analysis
# Descriptive Stats & Bayesian Model Coefficients (Centered Rank)

invisible(lapply(
    c("tidyverse", "brms", "tidybayes", "ggplot2"),
    library,
    character.only = TRUE
))

# ==============================================================================
# 1. Load & Prep Data
# ==============================================================================

exp_data_path <- "./analysis/data/exp_data.csv"
freq_data_path <- "./freqs_for_analysis.csv"

# Adjust paths if running from root vs analysis folder
if (!file.exists(exp_data_path) && file.exists("data/exp_data.csv")) {
    exp_data_path <- "data/exp_data.csv"
    freq_data_path <- "../freqs_for_analysis.csv"
}


stopifnot(file.exists(exp_data_path), file.exists(freq_data_path))

message("Loading data...")
exp <- read_csv(exp_data_path, show_col_types = FALSE)
freq <- read_csv(freq_data_path, show_col_types = FALSE)

stopifnot(nrow(exp) > 0, nrow(freq) > 0)


rank_freq <- freq %>%
    arrange(desc(Coord)) %>%
    mutate(
        rank = row_number(),
        rel_freq = Coord / sum(Coord)
    )


lex <- rank_freq %>%
    transmute(
        item,
        Coord,
        PMI,
        cPMI,
        csumPMI,
        rank,
        rel_freq,
        word = str_split(item, fixed(" ve "))
    ) %>%
    unnest_longer(word) %>%
    mutate(word = str_squish(word))

lex <- lex %>% mutate(word = dplyr::recode(word, "ilim" = "bilim"))

data_joined <- exp %>% left_join(lex, by = c("conj1" = "word"))

stopifnot(nrow(data_joined) > 0)

# Create rank and rank_c
# rank defined by descending Coord
data_joined <- data_joined %>%
    # distinct items to calculating rank first?
    # Rank should be global per item, not calculated on exploded dataset.
    # Better to calculate rank on freq table first.
    select(-matches("rank|rank_c")) # remove if exists to avoid dupes

freq_ranked <- freq %>%
    arrange(desc(Coord)) %>%
    mutate(
        rank = row_number(),
        rank_c = rank - mean(rank)
    )

# Re-join rank info
# Remove columns from data_joined that came from freq to avoiding duplication/conflict, then rejoin
cols_to_remove <- intersect(names(freq_ranked), names(data_joined))
cols_to_remove <- setdiff(cols_to_remove, c("item", "itemNum")) # keep key

# Actually, easiest is to just compute rank on the joined data IF we are careful about distinct items.
# But safer to join `rank_c` from `freq_ranked`.
# We need to know which key we used.
join_key <- if ("itemNum" %in% names(freq)) "itemNum" else "item"

data_joined <- data_joined %>%
    left_join(
        freq_ranked %>% select(all_of(join_key), rank, rank_c),
        by = join_key
    )

stopifnot("rank_c" %in% names(data_joined))
stopifnot(!any(is.na(data_joined$rank_c)))

# ==============================================================================
# 2. Descriptive Analysis
# ==============================================================================

# Median split on rank (High Rank = Low Freq)
median_rank <- median(data_joined$rank, na.rm = TRUE)
data_joined <- data_joined %>%
    mutate(freq_group = if_else(rank <= median_rank, "High Freq", "Low Freq"))

stopifnot(all(!is.na(data_joined$freq_group)))


# data_joined$is_sa <- as.factor(data_joined$is_sa)
# data_joined$rating <- factor(data_joined$rating, ordered = TRUE)
data_joined <- data_joined %>%
    group_by(completionCode) %>%
    mutate(subject = paste0("S", cur_group_id())) %>%
    ungroup()
data_joined$subject <- as.factor(data_joined$subject)
# data_joined$itemNum <- as.factor(data_joined$itemNum)
# data_joined$suffix <- as.factor(data_joined$suffix)

# Change Turkish suffix names to English counterparts
data_joined <- data_joined %>%
    mutate(
        suffix = case_when(
            suffix == "-cI" ~ "-supporter",
            suffix == "-lI" ~ "-with",
            suffix == "-sIz" ~ "-without",
            suffix == "-lIk" ~ "-hood"
        )
    )

data_joined <- data_joined %>%
    mutate(Suspension = if_else(is_sa == 1, "Susp", "Full"))

desc_stats <- data_joined %>%
    group_by(suffix, Suspension, freq_group) %>%
    summarise(
        mean_rating = mean(rating, na.rm = TRUE),
        se = sd(rating, na.rm = TRUE) / sqrt(n()),
        n = n(),
        .groups = "drop"
    )

stopifnot(nrow(desc_stats) == 16) # 4 suffixes * 2 is_sa * 2 freq
print(desc_stats)

# Plot Descriptive
p_desc <- ggplot(
    desc_stats,
    aes(
        x = Suspension,
        y = mean_rating,
        shape = freq_group,
        group = freq_group,
        linetype = freq_group
    )
) +
    geom_point(position = position_dodge(0.2), size = 3) +
    geom_line(position = position_dodge(0.2), linewidth = 1) +
    geom_errorbar(
        aes(ymin = mean_rating - 1.8 * se, ymax = mean_rating + 1.8 * se),
        position = position_dodge(0.2),
        width = 0.1,
        linewidth = 1
    ) +
    facet_wrap(~suffix, nrow = 1) +
    theme_classic(base_size = 18) +
    # theme(axis.text.x = element_text(angle = 30, hjust = 1)) +
    labs(
        # title = "Descriptive Stats: Rating by Suffix & Frequency",
        y = "Mean Rating",
        x = "Suspended Affixation"
    )

ggsave("analysis/descriptive_hsp_rank_c.pdf", p_desc, width = 12, height = 4)
message("Saved descriptive plot.")

# ==============================================================================
# Plot Item-Level Stats (Rating vs Frequency)
# ==============================================================================

# Calculate interaction stats (Suspension * rank_c) per suffix
interaction_stats <- data_joined %>%
    group_by(suffix) %>%
    summarise(
        p_val = summary(lm(rating ~ Suspension * rank_c))$coefficients[
            4,
            4
        ], # 4th row is usually interaction
        .groups = "drop"
    ) %>%
    mutate(
        label = case_when(
            p_val < 0.001 ~ "p < 0.001",
            p_val < 0.01 ~ "p < 0.01",
            p_val < 0.05 ~ "p < 0.05",
            TRUE ~ sprintf("p = %.3f", p_val)
        )
    )

# Reorder suffix based on p_val (lowest to highest)
suffix_order <- interaction_stats %>%
    arrange(p_val) %>%
    pull(suffix)

item_stats <- data_joined %>%
    group_by(suffix, Suspension, item, rank_c) %>%
    summarise(
        mean_rating = mean(rating, na.rm = TRUE),
        n = n(),
        .groups = "drop"
    ) %>%
    mutate(suffix = factor(suffix, levels = suffix_order))

interaction_stats <- interaction_stats %>%
    mutate(suffix = factor(suffix, levels = suffix_order)) %>%
    mutate(
        x_pos = min(item_stats$rank_c), # Position left
        y_pos = max(item_stats$mean_rating) - 0.5 # Position top
    )

p_item <- ggplot(
    item_stats,
    aes(
        x = rank_c,
        y = mean_rating,
        color = Suspension,
        shape = Suspension
    )
) +
    geom_point(size = 4, alpha = 0.7) +
    geom_smooth(method = "lm", se = FALSE, linewidth = 1.5) +
    geom_text(
        data = interaction_stats,
        aes(x = x_pos, y = y_pos, label = label),
        inherit.aes = FALSE,
        hjust = 0,
        vjust = 1,
        size = 6,
        color = "black"
    ) +
    facet_wrap(~suffix, nrow = 1) +
    theme_classic(base_size = 22) +
    labs(
        # title = "Item Ratings by Frequency",
        y = "Mean Rating",
        x = "Centered Rank Frequency",
        color = "Condition",
        shape = "Condition"
    )

ggsave("analysis/item_frequency_plot.png", p_item, width = 12, height = 4)
message("Saved item frequency plot.")

# ==============================================================================
# 3. Model Fitting (Conditional)
# ==============================================================================

# Ensure output directory
model_dir <- "./analysis/models"
if (!dir.exists(model_dir)) {
    dir.create(model_dir, recursive = TRUE)
}

suffixes <- c("-supporter", "-with", "-hood", "-without")
cleaned_suffixes <- c("cI", "lI", "lIk", "sIz") # map to file names

# Priors (from nested_suffix.qmd)
my_prior <- c(
    prior(normal(0, 0.5), class = "b", coef = "is_sa1"),
    prior(exponential(1), class = "sd", group = "subject"),
    prior(exponential(1), class = "sd", group = "itemNum"),
    prior(exponential(1), class = "sd", coef = "is_sa1", group = "subject"),
    prior(lkj(2), class = "cor"),
    prior(normal(0, 5), class = "Intercept")
)


# Helper function to fit model
run_suffix_model <- function(suffix_val, data_full, prior_spec) {
    # Filter data
    dat <- data_full %>% filter(suffix == suffix_val)
    stopifnot(nrow(dat) > 0)

    # Set contrasts
    dat$is_sa <- as.factor(dat$is_sa)
    dat$subject <- as.factor(dat$subject)
    dat$itemNum <- as.factor(dat$itemNum)

    contrasts(dat$is_sa) <- contr.sum(2) / 2

    # Formula: rank_c
    f <- bf(
        rating ~ 1 +
            is_sa * rank_c +
            (1 + is_sa * rank_c | subject) +
            (1 + is_sa | itemNum)
    )

    # Fit
    if (!dir.exists("analysis/models")) {
        dir.create("analysis/models")
    }

    # We assume family is cumulative logit based on context,
    # but user code in qmd used `rating ~ ...` and usually `cumulative("logit")`.
    # `response` might be numeric or ordered factor.
    # qmd: `Outcome: rating (ordered factor) -> cumulative logit`
    # We need to ensure response is ordered factor.
    dat$rating <- factor(dat$rating, ordered = TRUE)

    fit <- brm(
        formula = f,
        data = dat,
        family = cumulative("logit"),
        prior = prior_spec,
        chains = 4,
        cores = 4,
        iter = 4000,
        control = list(adapt_delta = 0.95, max_treedepth = 15),
        backend = "cmdstanr",
        file = paste0(
            model_dir,
            "/model_",
            str_remove_all(suffix_val, "-"),
            "_rank_c"
        )
    )
    return(fit)
}
name_suffixes <- c("Supporter", "With", "Hood", "Without")
# Loop and fit if needed
for (i in seq_along(name_suffixes)) {
    s_raw <- suffixes[i]
    s_clean <- name_suffixes[i]

    fname <- paste0(model_dir, "/model_", s_clean, "_rank_c.rds")

    if (file.exists(fname)) {
        message("Model exists: ", fname)
    } else {
        message(
            "Model MISSING: ",
            fname,
            ". Fitting now... (this may take time)"
        )
        # We rely on `file` argument in brm to save it, but brm saves as .rds automatically if file arg provided?
        # Actually brm `file` argument saves the fit.
        # file extension typically added automatically by brm if missing, but we provided full path without extension in helper?
        # Let's check helper: `paste0(..., "_rank_c")` -> brm adds `.rds`.
        # So we should call the function.

        run_suffix_model(s_raw, data_joined, my_prior)
    }
}

# ==============================================================================
# 4. Bayesian Plotting
# ==============================================================================

message("Generating model coefficient plots...")

all_draws <- list()

for (i in seq_along(suffixes)) {
    s_raw <- name_suffixes[i]
    s_clean <- cleaned_suffixes[i]
    fname <- paste0(model_dir, "/model_", s_raw, "_rank_c.rds")

    stopifnot(file.exists(fname))
    mod <- readRDS(fname)

    # Extract fixed effects
    # Defines: `b_is_sa1`, `b_rank_c`, `b_is_sa1:rank_c`
    # Note: is_sa contrast sum(2)/2 -> is_sa1 usually refers to first level vs grand mean (or similar depending on coding).
    # We want to see the posterior of these coefficients.

    d <- mod %>%
        gather_draws(`b_.*`, regex = TRUE) %>%
        mutate(suffix = s_raw)

    all_draws[[i]] <- d
}

stopifnot(length(all_draws) > 0)
combined_draws <- bind_rows(all_draws)

# Filter relevant terms
# We want is_sa main effect and interaction
plot_terms <- combined_draws %>%
    filter(
        str_detect(.variable, "is_sa") | str_detect(.variable, "rank_c")
    ) %>%
    filter(!str_detect(.variable, "Intercept")) %>% # exclude intercepts
    filter(.variable != "b_rank_c") %>%
    mutate(
        term_label = case_when(
            str_detect(.variable, ":") ~ "Interaction",
            TRUE ~ "Suspension (Main)"
        )
    )

stopifnot(nrow(plot_terms) > 0)

# Calculate interaction probabilities for ordering
suffix_interaction_probs <- plot_terms %>%
    filter(term_label == "Interaction") %>%
    group_by(suffix) %>%
    summarise(mean_prob = mean(.value > 0), .groups = "drop") %>%
    arrange(mean_prob) # Ascending because ggplot fills bottom-up, so top will be highest

suffix_levels <- suffix_interaction_probs$suffix

plot_terms <- plot_terms %>%
    mutate(suffix = factor(suffix, levels = suffix_levels))

# Calculate stats for manual plotting (since we need geom_rect)
term_stats <- plot_terms %>%
    group_by(suffix, term_label) %>%
    median_qi(.value, .width = 0.95) %>% # Calculate median and 95% CI
    mutate(
        suffix_num = as.numeric(suffix),
        # Manual dodge: Interaction top (shift +), Main bottom (shift -)?
        # Default position_dodge(width=0.6) with 2 items usually puts first item at -0.15, second at +0.15?
        # Let's define manual shifts.
        y_shift = if_else(term_label == "Interaction", 0.15, -0.15),
        y_pos = suffix_num + y_shift,

        # Prob > 0 for labels (re-calculate on group)
        # Wait, median_qi collapses groups. We need to join prob > 0.
        # Let's separate calculation.
    )

# Calculate P(>0) separately and join
probs_gt0 <- plot_terms %>%
    group_by(suffix, term_label) %>%
    summarise(prob_pos = mean(.value > 0), .groups = "drop")

term_stats <- term_stats %>%
    left_join(probs_gt0, by = c("suffix", "term_label")) %>%
    mutate(
        label = sprintf("P(>0)=%.2f", prob_pos)
    )

# Calculate text position
global_max_x <- max(plot_terms$.value)
x_range_val <- global_max_x - min(plot_terms$.value)
text_pos_x <- global_max_x + (x_range_val * 0.05)

# Define rectangle data for interactions
rect_data <- term_stats %>%
    filter(term_label == "Interaction") %>%
    mutate(
        ymin = y_pos - 0.1, # Height of highlight box
        ymax = y_pos + 0.1,
        xmin = -0.5, # Highlight Covers the CI? Or the whole plot width?
        # "highlight the background of interaction lines" -> assuming covering the interval line.
        xmax = 2.5
    )

# Use manual y-axis labels
suffix_labels <- levels(plot_terms$suffix)

p_coef <- ggplot() +
    # Background Highlight Rect (Interaction only)
    geom_rect(
        data = rect_data,
        aes(xmin = xmin, xmax = xmax, ymin = ymin, ymax = ymax),
        fill = "blue",
        alpha = 0.2
    ) +
    # Interval Lines (Error Bars)
    geom_errorbarh(
        data = term_stats,
        aes(xmin = .lower, xmax = .upper, y = y_pos, linetype = term_label),
        height = 0,
        color = "black",
        size = 2 # Line thickness
    ) +
    # Points
    geom_point(
        data = term_stats,
        aes(x = .value, y = y_pos, shape = term_label),
        size = 4,
        color = "black",
        fill = "black" # In case of filled shapes
    ) +
    # Text Labels
    geom_text(
        data = term_stats,
        aes(x = 1.8, y = y_pos, label = label),
        hjust = 0,
        size = 6,
        color = "black"
    ) +
    geom_vline(xintercept = 0, linetype = "dashed", alpha = 0.5) +
    theme_minimal(base_size = 22) +
    # theme(legend.position = "bottom") +
    scale_y_continuous(
        breaks = 1:length(suffix_labels),
        labels = suffix_labels
    ) +
    # scale_x_continuous(expand = expansion(mult = c(0.05, 0.3))) +
    labs(
        # title = "Posterior Coefficients",
        x = "Estimate",
        y = NULL,
        shape = "Effect Type",
        linetype = "Effect Type"
    )

ggsave(
    "analysis/model_coefficients_rank_c.png",
    p_coef,
    width = 10,
    height = 3.5
)
message("Saved model coefficients plot.")
