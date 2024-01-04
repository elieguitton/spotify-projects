# Dans ce fichier, nous allons créer une application qui va sauvegarder la playlist Discover Weekly dans une autre playlist appelée Saved Weekly.

# Importation des modules nécessaires
import spotipy
import time
from spotipy.oauth2 import SpotifyOAuth

from flask import Flask, request, url_for, redirect, session

# On initialise l'application Flask
app = Flask(__name__)

# On stocke des informations
app.config['SESSION_COOKIE_NAME'] = 'spotify-login-session'
app.secret_key = 'dgdfgfdh564%*$'
TOKEN_INFO = 'token_info'

# On définit les routes
@app.route('/')
def login():
    auth_url = create_spotify_oauth().get_authorize_url()
    return redirect(auth_url)

@app.route('/redirect')
def redirect_page():
    session.clear()
    code = request.args.get('code')
    token_info = create_spotify_oauth().get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect(url_for('save_discover_weekly', _external = True))
    

@app.route('/saveDiscoverWeekly')
def save_discover_weekly():
    
    # On teste si l'utilisateur arrive à se connecter
    try:
        token_info = get_token()
    except:
        print("User not logged in !")
        return redirect('/')
    
    # Si oui, on récupère les informations de l'utilisateur
    sp = spotipy.Spotify(auth = token_info['access_token'])
    user_id = sp.current_user()['id']
    current_playlists = sp.current_user_playlists()['items']
    
    discover_weekly_id = None
    saved_weekly_id = None
    
    # On parcourt les playlists de l'utilisateur et on récupère les ID des playlists Discover Weekly et Saved Weekly
    for playlist in current_playlists:
        if (playlist['name'] == 'Discover Weekly') or (playlist['name'] == 'Découvertes de la semaine'):
            discover_weekly_id = playlist['id']
            
        if (playlist['name'] == 'Saved Weekly'):
            saved_weekly_id = playlist['id']
            
    # Si la playlist Discover Weekly n'est pas trouvée, on renvoie l'utilisateur à la page d'accueil
    if not discover_weekly_id:
        return("Discover Weekly not found !")
        
    # Si la playlist Saved Weekly n'est pas trouvée ou n'existe pas, on la crée
    if not saved_weekly_id:
        new_playlist = sp.user_playlist_create(user_id, 'Saved Weekly', public = False, collaborative = False, description = "J'ai codé une application qui sauvegarde ma playlist Discover Weekly toutes les semaines dans celle-ci.")
        saved_weekly_id = new_playlist['id']
    
    discover_weekly_playlist = sp.playlist_items(discover_weekly_id)
    song_uris = []
    
    # On parcourt les titres de la playlist Discover Weekly et on les ajoute à la playlist Saved Weekly
    for song in discover_weekly_playlist['items']:
        song_uris.append(song['track']['uri'])
    sp.user_playlist_add_tracks(user_id, saved_weekly_id, song_uris)
    return("SUCCESS !")


# Récupérer le token
def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        redirect(url_for('login', _external = False))
        
    now = int(time.time())
    is_expired = token_info['expires_at'] - now < 60
    if (is_expired):
        token_info = create_spotify_oauth().refresh_access_token(token_info['refresh_token'])
    return token_info
    
# Se connecter à l'API Spotify
def create_spotify_oauth():
    return SpotifyOAuth(client_id = 'd04b524d7dba4bed82dba73de558c25d',
                        client_secret = '5649c88777f949dda2a2ea7e79f200b6',
                        redirect_uri = url_for('redirect_page', _external = True),
                        scope = 'user-library-read playlist-modify-public playlist-modify-private',
                        )

# Lancer l'application
app.run(debug = True, port = 8080)
