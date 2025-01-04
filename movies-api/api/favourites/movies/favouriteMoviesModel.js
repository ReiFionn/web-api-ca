import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteMovieSchema = new Schema({
  username: { type: String },
  movie_ids: [{ type: Number }],
});

FavoriteMovieSchema.statics.findByUsername = function (username) {
    return this.findOne({ username: username });
};

export default mongoose.model('FavouriteMovieModel', FavoriteMovieSchema);