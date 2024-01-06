package com.example.player;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlayerController {
  PlayerService playerService = new PlayerService();

  @GetMapping("/players")
  public ArrayList<Player> allPlayers() {
    return playerService.getPlayers();
  }

  @GetMapping("/players/{playerId}")
  public Player getplayer(@PathVariable("playerId") int playerId) {
    return playerService.getPlayerById(playerId);
  }

  @PostMapping("/players")
  public Player addNewPlayer(@RequestBody Player player) {
    return playerService.addPlayer(player);
  }

  @PutMapping("/players/{playerId}")
  public Player update(@PathVariable("playerId") int playerId, @RequestBody Player player) {
    return playerService.updatePlayer(playerId, player);
  }

  @DeleteMapping("/players/{playerId}")
  public void deletePlayer(@PathVariable("playerId") int playerId) {
    playerService.deletePlayer(playerId);
  }

}
