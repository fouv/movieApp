import React, { PureComponent } from 'react';
import { StyleSheet, FlatList, View, TextInput, Button, ActivityIndicator } from 'react-native';
import ResumeFilm from './ResumeFilm';
import { connect } from 'react-redux';

class FilmsList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      films: [],
    }
  }

  _displayFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  }


  render() {

    return (
      <FlatList
        style={styles.list}
        data={this.props.films}
        extraData={this.props.favoritesFilm}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ResumeFilm
            film={item}
            isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
            displayFilm={this._displayFilm}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!this.props.favoritesListFilm && this.props.page < this.props.totalPages) {
            this.props.loadFilms()
          }
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,

  }
});

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmsList)