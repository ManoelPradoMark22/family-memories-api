import Album from './Album';
import Photo from './Photo';
import AlbumPhoto from './AlbumPhoto';
import User from './User';
import Family from './Family';

Photo.belongsToMany(Album, { through: AlbumPhoto, foreignKey: 'photo_id' });
Album.belongsToMany(Photo, { through: AlbumPhoto, foreignKey: 'album_id' });

User.hasMany(Photo, { foreignKey: 'user_id' });
Photo.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Album, { foreignKey: 'created_by' });
Album.belongsTo(User, { foreignKey: 'created_by' });

Family.hasMany(Album, { foreignKey: 'family_id' });
Album.belongsTo(Family, { foreignKey: 'family_id' });

export { Album, Photo, AlbumPhoto, User, Family };
