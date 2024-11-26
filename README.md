# AdventureGame
Made by Mateo Fernández Rivera (mateonation)

## 📄 DESCRIPTION
"AdventureGame" is a simple adventure game that i'm creating using *javascript*, *HTML* and *CSS*.
In this game you control a block that has to reach a goal in each level for them to be completed. Each of these will have different obstacles and tricks that you will have to overcome in order to complete this game.

## 🕹️ CONTROLS / HOW TO PLAY
The player controls with *'WASD'* keys a block that is placed in one of the tiles that are shown on the screen. The block can be moved to each one of these tiles by pressing the previously mentioned keys.
On each level there are a set of obstacles that the player may not overpass. These includes walls, doors, and other stuff. When the player tries to walk over these elements, they won't advance, making them move only on walkable tiles.
Also, there are enemies or "death" tiles in each level that will "kill" the player if they touch them, making them spawn again at the starting point of the level.

## ✨ ELEMENTS OF THE GAME
The next elements are already created tho none has a proper texture (they will be added in the future).
- _Player's block_ that moves when 'WASD' keys are pressed.
- _Walls_ that prevent the player from walking through them.
- _'Death' tiles_ that can respawn the player on level's spawnpoint.
- _Doors_ and it's _Buttons_ that can open them and allow the player to walk through blocked-before places
- _Goal points_ are the main objective that the player must reach in each level.

## ✍️ TO DO (WIP)
- [ ] **Level progression.** When player reaches a goal, the game should pop a window congratulating them and continue to the next level.
- [ ] **Moving enemies.** Initially, make blocks that can move vertically and horizontally. This movement should be looped and when the enemy reaches a wall it starts walking backwards.
- [x] **Bridges and it's buttons.** Initially hidden when opening the level but they can be deployed once the player position's themself on the bridge's button, letting them walk through previously blocked places. They work like doors but backwards.
- [ ] **Stages.** It's not an adventure game if you don't travel through different places, isn't it? I'm planning to add different stages with different aspects and elements between them.
- [ ] **Doors/Bridges closing again.** I want the doors and bridges of each level to close or hide again when the player 'dies', making them complete the whole level without dying. Also, the player can open and close them everytime they press it's buttons.
- [ ] **More 'death' tiles.** Now we only have 'lava' but i want to add 'water' or 'poison' type of stuff to make the player respawn on the level's spawnpoint everytime they try to walk over them.

> [!NOTE]
> ***These functions and it's values are subject to modifications and more can be added in the future.***