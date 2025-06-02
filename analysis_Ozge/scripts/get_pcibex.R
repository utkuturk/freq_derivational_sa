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
