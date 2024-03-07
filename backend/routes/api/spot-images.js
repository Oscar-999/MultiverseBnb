const express = require("express")
const { requireAuth } = require('../../utils/auth');
const { Spot,SpotImage,} = require('../../db/models');

const router = express.Router();



//Delete a Spot Image
router.delete("/:imageId", requireAuth, async (req,res,next) => {
    try {
        const userId = req.user.id;
        const imageId = req.params.imageId;
        const spotImage = await SpotImage.findByPk(imageId, {
            include: {
                model: Spot
            }
        })

        if (!spotImage) {
            return res.status(404).json({message: "Spot Image couldn't be found"})
        }
        if (spotImage.Spot.ownerId !== userId) {
            return res.status(403).json({message: "You must be the owner of this spot to delete Spot Images"})
        }

        await spotImage.destroy()
        return res.status(200).json({message: "Successfully deleted"})
    }catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }

})

module.exports = router
