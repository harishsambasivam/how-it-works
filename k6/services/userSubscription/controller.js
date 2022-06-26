
const maxResponseTimeInMs = 1500;

const getUser = (req,res) => {
    const {userId} = req.query;
    setTimeout(() => {
        res.status(200).json({
            status: "success",
            data: {
                userId
            }
        }); 
    }, Math.random() * maxResponseTimeInMs);
}

const addSubscription = (req,res) => {
    const data = req.body;
    setTimeout(() => {
        res.status(201).json({
            status: "success",
            data: {
                data
            }
        }); 
    }, Math.random() * maxResponseTimeInMs);
}

const updateSubscription = (req,res) => {
    const data = req.body;
    setTimeout(() => {
        res.status(204).json({
            status: "success",
            data: {
                data
            }
        }); 
    }, Math.random() * maxResponseTimeInMs);
}

const deleteSubscription = (req,res) => {
    const {userId} = req.query;
    setTimeout(() => {
        res.status(200).json({
            status: "success",
            data: {
                userId
            }
        }); 
    }, Math.random() * maxResponseTimeInMs);
}

module.exports = { getUser, addSubscription, updateSubscription, deleteSubscription };