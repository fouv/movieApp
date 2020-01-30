// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { getImageFromApi } from '../API/TheMDBApi';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';


class ResumeFilm extends React.Component {


//define icon full or empty
  _favoriteHeart() {
    const research = this.props.favoritesFilm.findIndex(item => item.id === this.props.film.id)
    if (research === (-1)) {
      return (
        <Ionicons name="ios-heart-empty" size={32} />
      )
    } else {
      return (
        <Ionicons name="md-heart" size={32} />
      )
    }
  }

  render() {
    const { film, displayFilm } = this.props


    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayFilm(film.id)}
      >
        <Image style={styles.image}
          source={{ uri: getImageFromApi(this.props.film.poster_path) }}
          backgroundColor='grey'
        />
        <View style={styles.header_container}>

          <Text style={styles.title_text}>{this._favoriteHeart()} {this.props.film.title}</Text>

          <Text style={styles.vote_text}>{this.props.film.vote_average}</Text>

          <View >
            <Text style={styles.description_text} numberOfLines={10}>{this.props.film.overview}</Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>

          <View style={styles.date_container}>
            <Text style={styles.date_text}>{this.props.film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',

  },
  image: {
    width: 140,
    height: 140,
    margin: 4,
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 5,
    flexDirection: 'column',

  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
    flexWrap: 'wrap',
    padding: 2,
    
  },
  vote_text: {

    fontSize: 14,
    color: 'orange',
    textAlign: "right"
  },
  description_container: {
    flex: 1,

    height: 180,

  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    textAlign: 'justify',
    padding: 8,
  },
  date_container: {
    flex: 1,
    padding: 5,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },

})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(ResumeFilm)

