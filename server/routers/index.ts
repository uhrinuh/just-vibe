import express from "express";
import searchController from "./searchController";
import albumOfTheDayController from "./albumOfTheDayController";
import musicController from "./musicController";
import profileController from "./profileController";
import albumIdController from "./albumIdController";
import reviewsController from "./reviewsController";
import topThreeController from "./topThreeController";
import followController from "./followController";
import followedUsers from "./followedUsers";
import reactionsController from "./reactionsController";
import isAuthenticated from "../middleware/auth";

const router = express.Router();

router.route('/search/:search').get(searchController.handleMusicSearch);
router.route('/search/users/:userId/:query').get(searchController.handleUserSearch);

router.route('/top/albums/:userId').get(isAuthenticated, topThreeController.getTopAlbums);
router.route('/top/albums/:oldAlbumId/:position/:userId').post(isAuthenticated, topThreeController.createOrUpdateTopAlbum);
router.route('/top/albums/:albumId/:position/:userId').delete(isAuthenticated, topThreeController.deleteTopAlbum);

router.route('/top/artists/:userId').get(isAuthenticated, topThreeController.getTopArtists);
router.route('/top/artists/:oldArtistId/:position/:userId').post(isAuthenticated, topThreeController.createOrUpdateTopArtist);
router.route('/top/artists/:artistId/:position/:userId').delete(isAuthenticated, topThreeController.deleteTopArtist);

router.route('/albums/:artistName/:albumName/reviews').get(reviewsController.getReviews);
router.route('/albums/:artistName/:albumName/review/:userId').post(reviewsController.createReview);
router.route('/albums/review/:id/:userId').delete(reviewsController.deleteReview);
router.route('/albums/review/:id/:userId').put(reviewsController.updateReview);

router.route('/album-of-the-day').post(albumOfTheDayController.setAlbumOfTheDay);
router.route('/album-of-the-day').get(albumOfTheDayController.getAlbumOfTheDay);
router.route('/album-of-the-day/:id').put(albumOfTheDayController.editAlbumOfTheDay);
router.route('/album-of-the-day/:id').delete(albumOfTheDayController.deleteAlbumOfTheDay);

router.route('/music/artist/:userId').post(musicController.saveArtist);
//remove this music controller route since we deleted the method from musicController
// router.route('/music/album/:userId').post(musicController.saveAlbum);
router.route('/music/albums').get(musicController.readAlbums);

router.route('/user').get(profileController.readUser);
router.route('/user/:userId').patch(profileController.updateUser);
router.route('/user/:userId').delete(profileController.deleteUser);

router.route('/album-id').post(albumIdController.getAlbumId);

router.route('/follow/:followedById/:followingId').post(followController.followUser);
router.route('/follow/:followedById/:followingId').delete(followController.unfollowUser);
router.route('/followers/:userId').get(followController.getFollowers);
router.route('/following/:userId').get(followController.getFollowing);

router.route('/feed/reviews/:userId').get(followedUsers.getFollowedUsersReviews);

router.route('/reactions').post(reactionsController.addOrUpdateReaction);
router.route('/reactions/:userId/:postId').delete(reactionsController.removeReaction);
router.route('/reactions/:userId/:postId').get(reactionsController.getReaction);

export default router;
