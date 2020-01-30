
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import FilmsList from '../Components/FilmsList';


class Favorite extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    //console.log('this props favoritefilms length ds didUpdate', (this.props.favoritesFilm).length);
    // console.log(this.props.favoritesFilm.map((element) => console.log('console log element', element)))
  }
  
  render() {
    
    return (     
       
        <FilmsList
          films={this.props.favoritesFilm} 
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          favoriteListFilms={true}
        />
        
     
    )
  }
}


const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorite)