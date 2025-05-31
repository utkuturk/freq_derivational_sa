#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = TRUE)
if (length(args) < 1) {
    stop("Please provide a filename as the first argument.")
}

fname <- args[1]

# User-defined function to read in PCIbex Farm results files
read.pcibex <- function(
    filepath,
    auto.colnames = TRUE,
    fun.col = function(col, cols) {
        cols[cols == col] <- paste(col, "Ibex", sep = ".")
        return(cols)
    }) {
    n.cols <- max(count.fields(filepath, sep = ",", quote = NULL), na.rm = TRUE)

    if (auto.colnames) {
        cols <- character()
        con <- file(filepath, "r")
        while (TRUE) {
            line <- readLines(con, n = 1, warn = FALSE)
            if (length(line) == 0) break

            m <- regmatches(line, regexec("^# (\\d+)\\. (.+)\\.$", line))[[1]]
            if (length(m) == 3) {
                index <- as.numeric(m[2])
                value <- m[3]
                if (is.function(fun.col)) {
                    cols <- fun.col(value, cols)
                }
                cols[index] <- value
                if (index == n.cols) break
            }
        }
        close(con)
        data <- read.csv(filepath, comment.char = "#", header = FALSE, col.names = cols)
    } else {
        data <- read.csv(filepath,
            comment.char = "#", header = FALSE,
            col.names = seq_len(n.cols)
        )
    }

    return(data)
}

# Run and print unique sonaIDs
data <- read.pcibex(fname)
print(unique(data$completionCode))
