import { schema } from "normalizr";

const Category = new schema.Entity("categories");

const Categories = new schema.Entity("categoryItems", {
  categories: { items: [Category] }
});

const Artist = new schema.Entity("artists");

const Album = new schema.Entity(
  "albums",
  {
    artistIds: [Artist]
  },
  {
    processStrategy: value => {
      const { artists, tracks, ...rest } = value;
      return {
        ...rest,
        artistIds: artists,
        trackIds: tracks ? tracks.items : []
      };
    }
  }
);

const Albums = new schema.Entity("albumItems", {
  albums: { items: [Album] }
});

const Track = new schema.Entity(
  "tracks",
  {
    albumId: Album,
    artistIds: [Artist]
  },
  {
    processStrategy: (value, parent) => {
      const { album, artists, ...rest } = value;
      return {
        ...rest,
        albumId: parent["type"] === "album" ? parent : album,
        artistIds: artists
      };
    }
  }
);

Album.define({
  trackIds: [Track]
});

const Playlist = new schema.Entity(
  "playlists",
  {
    trackIds: [Track]
  },
  {
    processStrategy: value => {
      const { tracks, ...rest } = value;
      return {
        ...rest,
        trackIds: tracks.items
          ? tracks.items.map((item: any) => item.track)
          : []
      };
    }
  }
);

const Playlists = new schema.Entity("playlistItems", {
  playlists: { items: [Playlist] }
});

const Results = new schema.Object({
  artists: { items: [Artist] },
  albums: { items: [Album] },
  tracks: { items: [Track] }
});

export const Schemas = {
  Artist,
  Album,
  Albums,
  Category,
  Categories,
  Track,
  Playlist,
  Playlists,
  Results
};
