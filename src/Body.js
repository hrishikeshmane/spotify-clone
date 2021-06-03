import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from 'react'
import "./Body.css"
import Header from "./Header"
import { useStateValue } from './StateProvider'
import SongRow from "./SongRow";

function Body({ spotify }) {
    const [{ discover_weekly }, dispatch] = useStateValue();

    const playPlaylist = (id) => {
        spotify.play({
            context_uri: `spotify:37i9dQZEVXcREedKL4Mkns`,
        }).then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
                dispatch({
                    type: "SET_ITEM",
                    item: r.item,
                });
                dispatch({
                    type: "SET_PLAYING",
                    playing: true
                });
            });
        }).catch((error) => {
            //console.log(error);
            alert("Player command failed: Spotify Premium required")
        })
    };

    const playSong = (id) => {
        spotify.play({
            uris: [`spotify:track:${id}`]
        }).then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
                dispatch({
                    type: "SET_ITEM",
                    item: r.item
                });
                dispatch({
                    type: "SET_PLAYING",
                    playing: true,
                });
            })
        }).catch((error) => {
            //console.log(error);
            alert("Player command failed: Spotify Premium required")
        })
    };

    return (
        <div className="body">
            <Header spotify={spotify} />
            
            <div className="body__info">
                <img src={discover_weekly?.images[0].url} alt="" />
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{discover_weekly?.name}</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>

            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon className="body__shuffle" onClick={ playPlaylist } />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>

                {/* List of Songs */}

                {discover_weekly?.tracks.items.map((item) => (
                    <SongRow track={item.track} playSong={ playSong } />
                ))}

            </div>           
        </div>
    )
}

export default Body
