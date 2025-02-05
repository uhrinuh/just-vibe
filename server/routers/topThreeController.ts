import { Request, Response} from 'express';
require('dotenv').config();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const topThreeController = {
  getTopAlbums: (req: Request, res: Response) => {
    let { userId } = req.params;
    const userIdNumber = Number(userId);

    if (userIdNumber < 0){
      return res.sendStatus(400);
    }

    prisma.album.findMany({
      orderBy: {
        albumName: 'asc'
      }
    })
    
    .then((albums) => {
      prisma.topAlbums.findMany({
        where: {
          userId: Number(userId)
        },
        orderBy: {
          position: 'asc'
        }
      })
      .then((topAlbums) => {
        res.status(200).json({albums, topAlbums})
      })
    })
    .catch((error) => {
      console.error('Error retrieving albums:', error)
      res.sendStatus(500)
    })

  },

  createOrUpdateTopAlbum: (req: Request, res: Response) => {
    const { position, oldAlbumId, userId } = req.params;
    const { newAlbumId } = req.body;
    if (oldAlbumId === '0'){
      prisma.topAlbums.create({
        data: {
          position: Number(position),
          albumId: Number(newAlbumId),
          userId: Number(userId),
        },
      })
      .then((topAlbum) => {
        res.status(201).json(topAlbum);
      })
      .catch((error) => {
        console.error('Error creating album:', error);
        res.sendStatus(500);

      })
      return;
    }

    prisma.topAlbums.update({
      where: {
        position_albumId_userId: {
          position: Number(position),
          albumId: Number(oldAlbumId),
          userId: Number(userId),
        }
      },
      data: {
        albumId: Number(newAlbumId)
      }
    })
    .then((topAlbum) => {
      res.status(200).json(topAlbum)
    })
    .catch((error) => {
      console.error('Error updating album:', error)
      res.sendStatus(500);
    })
  },


  deleteTopAlbum: (req: Request, res: Response) => {

    const { position, albumId, userId } = req.params;

    prisma.topAlbums.delete({
      where: {
        position_albumId_userId: {
          position: Number(position),
          albumId: Number(albumId),
          userId: Number(userId),
        }
      }
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.error('Error deleting album:', error);
      res.sendStatus(500)
    })
  },

  getTopArtists: (req: Request, res: Response) => {
    let { userId } = req.params;
    const userIdNumber = Number(userId);

    if (userIdNumber < 0){
      return res.sendStatus(400);
    }

    prisma.artist.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    .then((artists) => {
      prisma.topArtists.findMany({
        where: {
          userId: Number(userId)
        },
        orderBy: {
          position: 'asc'
        }
      })
      .then((topArtists) => {
        res.status(200).json({artists, topArtists})
      })
    })
    .catch((error) => {
      console.error('Error retrieving albums:', error)
      res.sendStatus(500)
    })
  },

  createOrUpdateTopArtist: (req: Request, res: Response) => {
    const { position, oldArtistId, userId } = req.params;
    const { newArtistId } = req.body;

    if (oldArtistId === '0'){
      prisma.topArtists.create({
        data: {
          position: Number(position),
          artistId: Number(newArtistId),
          userId: Number(userId),
        },
      })
      .then((topArtist) => {
        res.status(201).json(topArtist);
      })
      .catch((error) => {
        console.error('Error creating album:', error);
        res.sendStatus(500);

      })
      return;
    }

    prisma.topArtists.update({
      where: {
        position_artistId_userId: {
          position: Number(position),
          artistId: Number(oldArtistId),
          userId: Number(userId),
        }
      },
      data: {
        artistId: Number(newArtistId)
      }
    })
    .then((topArtist) => {
      res.status(200).json(topArtist)
    })
    .catch((error) => {
      console.error('Error updating album:', error)
      res.sendStatus(500);
    })
  },

  deleteTopArtist: (req: Request, res: Response) => {

    const { position, artistId, userId } = req.params;

    prisma.topArtists.delete({
      where: {
        position_artistId_userId: {
          position: Number(position),
          artistId: Number(artistId),
          userId: Number(userId),
        }
      }
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.error('Error deleting album:', error);
      res.sendStatus(500)
    })
  },
}

export default topThreeController;
