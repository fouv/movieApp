import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text, ScrollView, Image, Share, Platform, Button } from 'react-native';
import { getFilmFromApi, getImageFromApi } from '../API/TheMDBApi';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      film: undefined,
    }
    this._displayFavoriteFilmButton = this._displayFavoriteFilmButton.bind(this)
    this._displayLoading = this._displayLoading.bind(this)
    this._displayFilm = this._displayFilm.bind(this)
  }


  // call to API according to idFilm
  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) {
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      })
      return
    }
    this.setState({ isLoading: true })
    getFilmFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  };

  //display ActivityIndicator
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}><ActivityIndicator size="small" color="#00ff00" /></View>
      )
    }
  }
  //loading icon according state favoritesFilm
  _displayFavoriteFilm() {
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== (-1)) {
      return (
        <Ionicons name="md-heart" size={32} />
      )
    } else
      return (
        <Ionicons name="ios-heart-empty" size={32} />
      )
  }

  //display film
  _displayFilm() {
    const { film } = this.state;
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image style={styles.viewImage}
            source={{ uri: getImageFromApi(film.poster_path) }}
          />
          <Text style={styles.viewTitle}>{film.original_title}</Text>
          <TouchableOpacity
            style={styles.favorite_button}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteFilm()}
          </TouchableOpacity>
          <Text style={styles.viewComment}>{film.overview}</Text>
          <Text style={styles.viewFooter} >Sorti le : {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.viewFooter}>Note : {film.popularity}</Text>
          <Text style={styles.viewFooter}>Nombre de votes : {film.vote_count} </Text>
          <Text style={styles.viewFooter}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.viewFooter}>Genre(s) : {film.genres.map(function (genre) { return genre.name }).join("/")}</Text> 
          {/* <Text style={styles.viewFooter}>Compagnie(s) : {film.production_companies.map(function (companie) { return companie.name; }).join("/")}</Text> */}

        </ScrollView>
      )
    }
  }
  //ToggleFavorite action for Redux
  _toggleFavorite() {
    const action = { type: 'TOGGLE_FAVORITE', value: this.state.film }
    this.props.dispatch(action)
  }

  //share film
  _shareFilm() {
    const { film } = this.state
    if (film != undefined) {
      // console.log('console log this state film',this.state.film)
      Share.share({ title: film.title, message: film.overview, url: undefined })
    }
  }

  _displayFavoriteFilmButton() {
    const { film } = this.state
    if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.touchableButton}
          onPress={() => this._shareFilm()}>
          <Ionicons name="md-share" size={32} />
        </TouchableOpacity>
      )
    }
  }

  render() {

    return (
      <View style={styles.main_container}  >
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFavoriteFilmButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },

  viewImage: {
    flex: 2,
    height: 200,
  },
  viewTitle: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center',
  },
  viewComment: {
    flex: 3,
    textAlign: 'justify',
    height: 100,
    padding: 10,
    fontSize: 12,
  },
  viewFooter: {
    flex: 2,
    fontSize: 12,
    padding: 5,
    textAlign: 'justify',
    fontWeight: 'bold'
  },

  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  favorite_button: {
    alignItems: 'center',
  },
  touchableButton: {
    marginRight:20,
    bottom: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  share_image: {
    width: 30,
    height: 30,

  }

});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}
export default connect(mapStateToProps)(FilmDetail)