pkgs <- c("tidyverse", "brms", "Rmisc")
invisible(lapply(pkgs, require, character.only = TRUE))

# read file
get.ibex <- function(filepath) {
  lines <- readLines(filepath, warn = FALSE)
  header_lines <- grep("^# \\d+\\. .+\\.$", lines, value = TRUE)
  parsed <- do.call(rbind, regmatches(header_lines, gregexpr("\\d+|[^.]+(?=\\.$)", header_lines, perl = TRUE)))
  
  indices <- as.numeric(parsed[, 1])
  names_clean <- trimws(parsed[, 2])
  
  cols <- character(max(indices, na.rm = TRUE))
  cols[indices] <- names_clean
  
  read.csv(filepath, comment.char = "#", header = FALSE, col.names = cols)
}

fname <- "~/Downloads/apr18.csv"
df <- get.ibex(fname)

# forms
forms <- df %>% filter(Label == "demo" & PennElementType == "TextInput" & Parameter == "Final") %>%
  select(completionCode, PennElementName, Value) %>% 
  pivot_wider(names_from = PennElementName, values_from = Value)

# condition list
condition_labels <- c(
  "a" = "X-and-Y-ci",
  "b" = "X-ci-and-Y-ci",
  "c" = "X-and-Y-li",
  "d" = "X-li-and-Y-li",
  "e" = "X-and-Y-siz",
  "f" = "X-siz-and-Y-siz",
  "g" = "X-and-Y-lik",
  "h" = "X-lik-and-Y-lik"
)

# experimental items
exp <- df %>% filter(Label == "exp" & PennElementType == "Scale") %>%
  select(completionCode, trialNum, itemNum, condition, Value, sentence, conj1, conj2) %>% 
  mutate(condition = recode(condition, !!!condition_labels))

# fillers with q
filler_q <- df %>% filter(Label == "filler" & PennElementType == "Scale" & PennElementName == "answer" & Parameter == "Choice") %>%
  mutate(Value = ifelse(Value== "Hayir", "Hayır", Value), is_correct = Value == correctAnswer) %>%
  select(completionCode, trialNum, itemNum, condition, is_correct, sentence, question, answer_given = Value, correctAnswer)

# get by participant means and think of a cutoff for excluding people
cutoff <- 0.8
exclude <- filler_q %>% 
  group_by(completionCode) %>% 
  dplyr::summarize(mean_correct = mean(is_correct, na.rm = TRUE)) %>% 
  filter(mean_correct < cutoff) %>%
  .$completionCode

# all fillers
filler_scale <- df %>% filter(Label == "filler" & PennElementType == "Scale" & PennElementName == "scale") %>%
  select(completionCode, trialNum, itemNum, condition, rating = Value, sentence)

# plot them
# Summarize the data
summary_data <- exp %>%
  group_by(condition, Value) %>%
  dplyr::summarise(count = n(), .groups = "drop") %>%
  dplyr::mutate(rating = factor(Value, levels = c("oldukça iyi", "iyi", "iyi sayılır", "kötü sayılır", "kötü", "oldukça kötü")))

ggplot(summary_data, aes(x = rating, y = count)) +
  geom_col(fill = "steelblue") +
  facet_wrap(~ condition, ncol = 2) +
  labs(x = "Rating", y = "Count", title = "Counts by Condition for Each Rating") +
  theme_minimal()
