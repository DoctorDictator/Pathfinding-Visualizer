# Pathfinding Visualizer

This is an interactive tool built with React for visualizing pathfinding algorithms on a grid. It lets users see how algorithms find paths, with features like walls, weights, bombs, and maze generation. The visualization shows the scanning process with graduating colors, and the final path in yellow with moving arrows.

## Description

The app has a grid where you can place a start node, end node, walls, weights (to make paths harder), and bombs (as intermediate points). Generate mazes and run algorithms to watch them find the shortest path from start to end, going through bombs if present. Scanning is animated with colors that get darker for earlier nodes, and the path is highlighted in yellow with arrows that move along it.

## Features

- **Grid Tools**: Drag start, end, or bombs; draw walls; add weights.
- **Algorithms**: Several options to find paths.
- **Maze Creation**: Different ways to make mazes.
- **Visualization**: Colors for scanning (light for current, dark for previous), yellow path with moving arrows, special effects on path cells.
- **Special Items**: Bombs as must-visit points, weights as obstacles that slow the algorithm.
- **Clear Options**: Clear the whole board, bombs, walls/weights, or just the path.
- **Speed Settings**: Slow, normal, fast, ultra fast for animations.
- **Responsive Design**: Grid adjusts to screen size.

## Algorithms

- **BFS**: Explores level by level for unweighted shortest path.
- **DFS**: Dives deep into branches first.
- **Dijkstra**: Finds weighted shortest path, handling weights.
- **A***: Uses guesses to focus search.
- **Greedy BFS**: Prioritizes promising paths based on guesses.
- **Swarm**: Balanced search method.
- **Convergent Swarm**: Focuses more on the target.
- **Bidirectional Swarm**: Searches from both start and end at the same time.

Algorithms go through bombs before the end, show scanning colors (light for recent, dark for earlier), and draw yellow path with arrows from start to end.

## Maze Generation

- Recursive Division: Balanced, or skewed vertical/horizontal.
- Random Maze: Simple walls.
- Random Weight Maze: Simple weights.

## How it Works

- Drag start/end/bombs to move them.
- Bombs: Path goes start -> bomb1 -> bomb2 -> ... -> end.
- Weights: Make the algorithm treat them as harder to cross.
- Scanning: Light color for current area, darkening previous.
- Path: Yellow highlight with effects, arrows move and fade as path completes.
- Clear Path: Removes colors before a new run.

## Contributing

Fork the repo and submit pull requests. Open issues on GitHub for problems.

## License

MIT License. See LICENSE for details.
