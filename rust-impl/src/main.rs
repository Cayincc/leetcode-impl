mod diagonal_traverse;

use colored::*;

fn main() {
    diagonal_traverse::test_find_diagonal_order();
    println!("{} {} {}", "red".red(), "green".green(), "blue".blue());
}
