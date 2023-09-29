# simple-platformer
This Simple Platformer game contains 10 levels. Players can collect coins to rack up points while navigating past an array of obstacles and enemies.

# Here are some key components of this script
1. Multiple Game States: The game uses different canvases and overlay mechanics to manage different game states like the start screen, gameplay, winning, and game over states.
2. Dynamic Level Design: The levels array allows for custom-defined platforms and objectives for each game level. This flexibility can lead to a variety of level designs and challenges for the player.
3. Game Physics: The inclusion of GRAVITY and FRICTION constants suggests that the game has some form of physics simulation. This likely affects player movement, especially vertical motion and interactions with platforms.
4. Player Mechanics:
- Jumping: The player has a jumping state, which suggests the game includes jump mechanics.
- Double Jump: The doubleJumpAllowed property indicates that players might have the ability to perform a double jump, adding an extra layer of complexity to movement and platform navigation.
5. Overlay Transitions: The fadeInOutOverlay function provides a visual transition effect between game states. This enhances user experience by smoothly transitioning between scenes, such as starting the game or moving to the next level.
6. Adaptive Game Over Prompt: If a player doesn't make a choice after a game over event, the game prompts the player with an alert after a delay. This ensures that players are aware of their options to restart or exit.
7. Key Event Handling: The game uses key event listeners extensively to handle player input, such as starting the game, jumping, and making post-game decisions. This makes the game interactive and responsive to player actions.

# How to Play
Locally 
- Clone repository:
  git clone https://github.com/sfajors/simple-platformer.git
- Navigate to the directory:
  cd simple-platformer
- Open in browser: Double-click on simple-platformer.html or drag and drop the file into your preferred web browser.

Controls 
- Press S to start the game.
- Use the arrow keys to move the player.
- Press R to restart the game if you win or encounter a game-over scenario.
- Press E to exit the game.
