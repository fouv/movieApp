import React from 'react';
import { StyleSheet, FlatList, View, TextInput, Button, ActivityIndicator } from 'react-native';
import ResumeFilm from './ResumeFilm';
import { getFilmsFromApi, getFilmFromApi } from '../API/TheMDBApi';
import FilmsList from './FilmsList';
import {connect} from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      films: [],
      isLoading: false
    }
    this._loadFilms = this._loadFilms.bind(this);
    this.searchText = "";
    this.page = 0;
    this.totalPages = 0;
  
  }

  //return movies according to searchText and API
  _loadFilms() {
    if (this.searchText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApi(this.searchText, this.page + 1).then(data => {
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({
          films: [...this.state.films, ...data.results],
          isLoading: false
        });
      });
    }
  }


  // display films according to page
  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState({
      films: [],
       }, () => {
      this._loadFilms()
    });
  }

  // function display activity indicator
  _displayIsLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}><ActivityIndicator size="small" color="#00ff00" /></View>
      )
    }
  }

  // convert searchText in text
  _searchInputText(text) {
    this.searchText = text;
  }

  //return idFilm in FilmDetail Page
  _displayFilm = (idFilm) => {    
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  }

  render() {
     
    return (
      <View style={styles.container}>
        <TextInput style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchInputText(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button
          title='Rechercher'
          onPress={() => this._searchFilms()}
        />
       
        <FilmsList
          films={this.state.films} // Home récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmsList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
          favoriteListFilms={false}
        />
        {this._displayIsLoading()}

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
  search: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  textinput: {
    
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginLeft: 40,   
  },

  button: {
    flex: 1,
    
  },

  flatlist: {
    flex: 3,
  },  
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm   
  }
}
export default connect(mapStateToProps) (Home)