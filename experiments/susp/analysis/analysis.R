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
 
# get the forms
forms <- df %>% filter(Label == "demo" & PennElementType == "TextInput" & Parameter == "Final") %>%
  select(completionCode, PennElementName, Value) %>% 
  pivot_wider(names_from = PennElementName, values_from = Value)

# get PennElementType Scale
# get label == "exp"
exp <- df %>% filter(Label == "exp" & PennElementType == "Scale") %>%
  select(completionCode, trialNum, itemNum, condition, Value, sentence, conj1, conj2)
# get label == "filler"

filler_q <- df %>% filter(Label == "filler" & PennElementType == "Scale" & PennElementName == "answer" & Parameter == "Choice") %>%
  mutate(Value = ifelse(Value== "Hayir", "Hayır", Value), is_correct = Value == correctAnswer) %>%
  select(completionCode, trialNum, itemNum, condition, is_correct, sentence, question, answer_given = Value, correctAnswer)



filler_scale <- df %>% filter(Label == "filler" & PennElementType == "Scale" & PennElementName == "scale") %>%
  select(completionCode, trialNum, itemNum, condition, rating = Value, sentence)

# plot them

# EXP todo: 

# [ ] change Hayir to Hayır
# [ ] add RT