'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://i.pinimg.com/originals/12/e4/f4/12e4f412391c201fffe3d35a59ed2634.png',
        preview: true
      },
       {
        spotId: 1,
        url: 'https://i.pinimg.com/originals/1c/56/5b/1c565b959ea86817a5b60f5b0261f16b.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.redd.it/gf94vegmlg851.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.animationmagazine.net/wordpress/wp-content/uploads/Regular-Show-post6.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://m.media-amazon.com/images/M/MV5BNDQzMmRkOGEtMGM0Mi00OWUwLTgxOGUtZGY0M2JhNTc0YmRjXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_QL75_UX500_CR0,47,500,281_.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://media.architecturaldigest.com/photos/59df83d8b237417e2f905bff/master/w_1600%2Cc_limit/breaking%2520bad%2520pizza.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://na.rdcpix.com/625946635/a545dc497c1d4e1385851ca5e12f5a14w-c0rd-w832_h468_r4_q80.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.cheatsheet.com/wp-content/uploads/2021/06/Walter-and-Skyler-White.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.looper.com/img/gallery/why-swimming-pools-mean-more-than-you-think-in-breaking-bad/swimming-pools-highlight-walter-whites-destruction-1617202104.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/albuquerque/Breaking-Bad-RV-Tours-1110-91c4927d5056a36_91c493cc-5056-a36a-09ce5b8798d97612.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://heroichollywood.com/wp-content/uploads/2023/05/Avengers-Tower-MCU.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://e0.pxfuel.com/wallpapers/390/958/desktop-wallpaper-artstation-stark-tower-the-avengers-fan-art-binh-le.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: "https://pbs.twimg.com/media/CRR_yZlUAAApUKn.jpg",
        preview: true
      }, {
        spotId: 3,
        url: "https://i.pinimg.com/originals/f3/17/14/f31714a3991ac1d00a2c469ae7684d73.jpg",
        preview: true
      }, {
        spotId: 3,
        url: "https://pm1.aminoapps.com/7773/cedf7f2e71046c56843a6c15e2293e7d6394137br1-2048-852v2_hq.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://static.planetminecraft.com/files/resource_media/screenshot/1418/the_watterson__s_house_by_wani_ramirez-d5pdbol_lrg.jpg",
        preview: true
      },{
        spotId: 4,
        url: "https://m.media-amazon.com/images/M/MV5BNjk3YWQzZTAtYTkxZi00Y2VhLWI2NmYtNTE0YjQzZTMyMmZlXkEyXkFqcGdeQXVyMTM5NjAwNjYz._V1_.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://lightbox-prod.imgix.net/images/uploads/1521404578673-the-amazing-world-of-gumball_1920x1080_16x9.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.pinimg.com/originals/1d/ed/1c/1ded1c99a3f01ea79332f0fe848f5b4e.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://c4.wallpaperflare.com/wallpaper/365/740/884/gumball-cartoon-network-cartoon-hd-wallpaper-thumb.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://external-preview.redd.it/ja2rwASy69ySlG3q_Brb8RhD7Sq2gzUEqSxxAbomVS8.png?auto=webp&s=d94d3cd074c7933031287abca2bcfc9735c1c8a6",
        preview: true
      },
      {
        spotId: 5,
        url: "https://p.turbosquid.com/ts-thumb/t5/Oc9V7r/Tt/0001/png/1635836341/1920x1080/fit_q87/d61999c379b40f3ba93aafff95f1d8c4b6ee12d0/0001.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://1.bp.blogspot.com/-zJDq1wt5rpw/TtUOBl_QxNI/AAAAAAAAGrs/YZKFfFgQoNc/s1600/dbz2-02.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.pinimg.com/originals/ba/64/43/ba6443d734e7b480ffc2e0e47800a21f.png",
        preview: false
      },{
        spotId: 5,
        url: "https://www.ggrecon.com/media/ytidezbo/fortnite-a-familiar-training-location-how-to-visit.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://upload.wikimedia.org/wikipedia/en/3/37/Batcave-Batman1.png",
        preview: true
      },
      {
        spotId: 6,
        url: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/05/Batcave-1.jpg",
        preview: false
      }, {
        spotId: 6,
        url: "https://oyster.ignimgs.com/wordpress/stg.ign.com/2012/08/article-2183250-145EF361000005DC-491_964x588.jpg",
        preview: false
      },{
        spotId: 6,
        url: "https://static1.moviewebimages.com/wordpress/wp-content/uploads/article/6naGLsQszrynVK8nTCrr6WZnlK4FKF.jpg",
        preview: false
      },{
        spotId: 6,
        url: "https://media.architecturaldigest.com/photos/6228fa1eb39072781eaf9e39/master/w_1600%2Cc_limit/FBT1XK.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/sbp1.png",
        preview: true
      },
      {
        spotId: 7,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/sbp2.png",
        preview: false
      }, {
        spotId: 7,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/sbp3.png",
        preview: false
      },{
        spotId: 7,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/sbp4.png",
        preview: false
      },{
        spotId: 7,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/sbp5.jpg",
        preview: false
      },
      //Spot 8
      {
        spotId: 8,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/s1.png",
        preview: true
      },
      {
        spotId: 8,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/s2.png",
        preview: false
      }, {
        spotId: 8,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/s3.png",
        preview: false
      },{
        spotId: 8,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/s4.jpg",
        preview: false
      },{
        spotId: 8,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/s5.jpg",
        preview: false
      },

      //Spot 9
      {
        spotId: 9,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/gf1.png",
        preview: true
      },
      {
        spotId: 9,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/gf2.png",
        preview: false
      }, {
        spotId: 9,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/gf3.png",
        preview: false
      },{
        spotId: 9,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/gf4.png",
        preview: false
      },{
        spotId: 9,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/gf5.png",
        preview: false
      },

      //Spot 10
      {
        spotId: 10,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ps1.png",
        preview: true
      },
      {
        spotId: 10,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ps2.png",
        preview: false
      }, {
        spotId: 10,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ps3.png",
        preview: false
      },{
        spotId: 10,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ps4.jpg",
        preview: false
      },{
        spotId: 10,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ps5.png",
        preview: false
      },

      //Spot 11
      {
        spotId: 11,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/iz1.png",
        preview: true
      },
      {
        spotId: 11,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/iz2.png",
        preview: false
      }, {
        spotId: 11,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/iz3.png",
        preview: false
      },{
        spotId: 11,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/iz4.png",
        preview: false
      },{
        spotId: 11,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/iz5.png",
        preview: false
      },


      //Spot 12
      {
        spotId: 12,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/su1.png",
        preview: true
      },
      {
        spotId: 12,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/su2.png",
        preview: false
      }, {
        spotId: 12,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/su3.png",
        preview: false
      },{
        spotId: 12,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/su4.png",
        preview: false
      },{
        spotId: 12,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/su5.png",
        preview: false
      },


      {
        spotId: 13,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ha1.jpg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ha2.png",
        preview: false
      }, {
        spotId: 13,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ha3.png",
        preview: false
      },{
        spotId: 13,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ha4.png",
        preview: false
      },{
        spotId: 13,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/ha5.png",
        preview: false
      },


      {
        spotId: 14,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/tt1.png",
        preview: true
      },
      {
        spotId: 14,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/tt2.png",
        preview: false
      }, {
        spotId: 14,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/tt3.png",
        preview: false
      },{
        spotId: 14,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/tt4.png",
        preview: false
      },{
        spotId: 14,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/tt5.png",
        preview: false
      },


      {
        spotId: 15,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/Southpark1.png",
        preview: true
      },
      {
        spotId: 15,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/sp5.png",
        preview: false
      }, {
        spotId: 15,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/sp4.png",
        preview: false
      },{
        spotId: 15,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/sp3.png",
        preview: false
      },{
        spotId: 15,
        url: "https://skills-swap.s3.us-east-2.amazonaws.com/Sp2.png",
        preview: false
      },
// test
      {
        spotId: 16,
        url: "https://images-ext-2.discordapp.net/external/GGW0x7hJzXUxvXdVdFb9MPnflIuTnIdEJtRa8cdOjy0/https/c4.wallpaperflare.com/wallpaper/308/366/395/adventure-time-hd-adventure-time-finn-s-house-wallpaper-preview.jpg",
        preview: true
      },
      {
        spotId: 16,
        url: "https://images-ext-1.discordapp.net/external/bbzxpF31Cw-g1h69k3Ur7en0vCDI-gJECIGwyhtj7fo/https/mir-s3-cdn-cf.behance.net/project_modules/max_1200/e262a340330989.5783bc9ada54f.jpg",
        preview: false
      }, {
        spotId: 16,
        url: "https://images-ext-2.discordapp.net/external/BZBpMKTTJ9XywflkSiDyA2U-HctmT4heZYbarKLJgi4/https/i.pinimg.com/originals/89/fc/cc/89fccca43accec7535e4f2ae6498922f.jpg",
        preview: false
      },{
        spotId: 16,
        url: "https://images-ext-2.discordapp.net/external/ube5xlFQLT2GF5eKML1LRzy3uSzdHK94Mc-Pd1dqAes/https/i.pinimg.com/1200x/6c/7f/80/6c7f805e418b517b69f228ae0ad01a98.jpg",
        preview: false
      },{
        spotId: 16,
        url: "https://images-ext-2.discordapp.net/external/Pkira3Tc3GChWHHKbe0Uy8aAD9QIx-7snwi50lvnP4o/https/i.pinimg.com/originals/96/66/c8/9666c82eed4161b39fe088fa3136bbc6.jpg",
        preview: false
      },
    ], {})
  },
// sdf
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3,4,5,6, 7,8,9, 10,11,12, 13,14,15,16] }
    }, {})
  }
};
