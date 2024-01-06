package com.example.player;

import java.util.ArrayList;

public interface PlayerRepository {
    public ArrayList<Player> getPlayers();

    public Player getPlayerById(int playerId);

    public Player addPlayer(Player player);

    public Player updatePlayer(int playerId, Player player);

    public void deletePlayer(int playerId);
}