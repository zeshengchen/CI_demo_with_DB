// Refer to an example provided by Azat Mardan
// Refer to https://mongoosejs.com/docs/

// Imports
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose"

// Instantiations
const app = express()

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/user-profile')
    console.log('DB connected!')
}

const profileSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
})
const Profile = mongoose.model('Profile', profileSchema)

// Configurations

// Middleware
app.use(bodyParser.json())

// Routes
app.get('/profile', async (req, res) => {
    try {
        const profiles = await Profile.find({}, { '_id': 0, 'first_name': 1, 'last_name': 1 })

        if (req.query.id) {
            if (req.query.id < profiles.length)
                res.send(profiles[req.query.id])
            else 
                res.sendStatus(404)
        }  
        else
            res.send(profiles)    
    } catch(err) {
        return res.sendStatus(500)
    }
})

app.post('/profile', async (req, res) => {
    const profile = new Profile(req.body)
    try {
        await profile.save()
    } catch (err) {
        return res.sendStatus(400)
    }
    console.log('created', profile)
    res.sendStatus(201)
})

app.put('/profile/:id', async (req, res) => {
    try {
        const profiles = await Profile.find({})

        if (req.params.id < profiles.length) {
            const profile = profiles[req.params.id]
            profile.first_name = req.body.first_name
            profile.last_name = req.body.last_name

            await profile.save()

            console.log("Update", profile)
            res.sendStatus(204)
        } else {
            res.sendStatus(404) 
        }
    } catch (err) {
        return res.sendStatus(400)
    }
})

app.delete('/profile/:first_name', async (req, res) => {
    try {
        await Profile.deleteOne({ first_name: req.params.first_name })
        console.log('deleted', req.params.first_name)
        res.sendStatus(204)
    } catch(err) {
        res.sendStatus(500)
    }
})

// Error handlers

// Server bootup or server export
app.listen(process.env.PORT || 8080)

export default app
 