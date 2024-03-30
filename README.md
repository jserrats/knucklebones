# Knucklebones

This a version of the knucklebones dice game that appears in the game [Cult of the Lamb](https://store.steampowered.com/app/1313140/Cult_of_the_Lamb/)

This has been developed as an exercise to practice the basics of the React framework, and is heavily based on the quick start [tutorial](https://react.dev/learn/tutorial-tic-tac-toe).

Deployed on github pages as described [here](https://create-react-app.dev/docs/deployment/#github-pages)

## TO PLAY

Go [here](https://jserrats.github.io/knucklebones)

## RULES

- The game consists of two 3x3 boards, each belonging to their respective player.
- The players take turns. On a player's turn, they roll a single 6-sided die, and must place it in a column on their board. A filled column does not accept any more dice.
- Each player has a score, which is the sum of all the dice values on their board. The score awarded by each column is also displayed.
- If a player places multiple dice of the same value in the same column, the score awarded for each of those dice is multiplied by the number of dice of the same value in that column. e.g. if a column contains 4-1-4, then the score for that column is 4x2 + 1x1 + 4x2 = 17. Below is a multiplication table for reference and comparison:
- When a player places a die, all dice of the same value in the corresponding column of the opponent's board gets destroyed. Players can use this mechanic to destroy their opponent's high-scoring combos.
- The game ends when either player completely fills up their 3x3 board. The player with the higher score wins.

For more details check the [Cult of the Lamb wiki page](https://cult-of-the-lamb.fandom.com/wiki/Knucklebones)

## TODO

- Add some CSS, formatting, etc
- Customize player names
- Implement an endgame view