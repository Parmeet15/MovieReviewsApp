const MovieReview = artifacts.require("MovieReview");
require('chai')
.use(require('chai-as-promised'))
.should();

contract(MovieReview,([deployer, user1, user2, user3, user4])=>{
    let movieReview;
    before(async () =>{
        movieReview = await MovieReview.deployed()
    })
    describe('Movie Review Deployment', async()=>{
        it('The deployment should be done successfully',async() =>{
            const address = await movieReview.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined) 
        })

        it('The deployed smart contract has the correct name', async()=>{
            const name = await movieReview.companyName();
            assert.equal(name, 'CinePlaza Movies')
        })
    })

    describe('Adding and deleting Location', async()=>{
        let result, locationNumber
        
        before(async ()=>{
            result = await movieReview.addLocation('Burnaby',{from: deployer})
            locationNumber = await movieReview.locationNumber()
        })
        it ('Adding location should be successful if all correct and done by owner', async ()=>{
            
            assert.equal(locationNumber,1);
            const event = result.logs[0].args;
                       
            assert.equal(event.id.toNumber(), locationNumber.toNumber(), 'Location id is correct');
            assert.equal(event.name, 'Burnaby','Location name is correct');
            assert.equal(event.active, true,'status is correct');
        })

        it ('Adding location should fail if done by user', async ()=>{
            
            await movieReview.addLocation('Burnaby',{from: user1}).should.be.rejected;
            
        })

        it ('Adding location should fail if name not given', async ()=>{
            
            await movieReview.addLocation('',{from: deployer}).should.be.rejected;
            
        })

        it ('Adding location should fail if same name location already exists', async ()=>{
            
            await movieReview.addLocation('Burnaby',{from: deployer}).should.be.rejected;
            
        })

        it ('Deleting location should fail if invalid location id passed', async ()=>{
            await movieReview.deleteLocation(2,{from: deployer}).should.be.rejected;
            
        })


        it ('Deleting location should be successfull if done by owner', async ()=>{
            result =  await movieReview.deleteLocation(1,{from: deployer});
            const event = result.logs[0].args;
                       
            assert.equal(event.id.toNumber(), locationNumber.toNumber(), 'Location id is correct');
            assert.equal(event.name, 'Burnaby','Location name is correct');
            assert.equal(event.active, false,'status is correct');
            
        })

        it ('Deleting location should fail if already inactive', async ()=>{
            await movieReview.deleteLocation(1,{from: deployer}).should.be.rejected;
            
        })
        
    })

    describe('Adding and deleting Cinema Hall', async()=>{
        let result, locationNumber
        
        before(async ()=>{
            result = await movieReview.addLocation('Vancouver',{from: deployer})
            locationNumber = await movieReview.locationNumber()
        })
        it ('Adding cinema hall should be successful if all correct and done by owner', async ()=>{
            
            result = await movieReview.addCinemaHall('North Vancouver', 2,{from: deployer})
            cinemaHallNumber = await movieReview.cinemaHallNumber()
            assert.equal(cinemaHallNumber,1);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), cinemaHallNumber.toNumber(), 'Cinema Hall id is correct');
            assert.equal(event.locationId.toNumber(), 2, 'Location id is correct');
            assert.equal(event.name, 'North Vancouver','Cinema Hall name is correct');
            assert.equal(event.active, true,'status is correct');
        })

        
        it ('Adding cinema hall should fail if name not given', async ()=>{
            
            await movieReview.addCinemaHall('',2, {from: deployer}).should.be.rejected;
            
        })

        it ('Adding cinema hall should fail if  location is inactive or invalid', async ()=>{
            
            await movieReview.addCinemaHall('West Vancouver', 1,{from: deployer}).should.be.rejected;
            await movieReview.addCinemaHall('West Vancouver', 3,{from: deployer}).should.be.rejected;
            
        })

        it ('Adding cinema hall should fail if  sane name cinemal hall already present on that location', async ()=>{
            
            await movieReview.addCinemaHall('North Vancouver', 2,{from: deployer}).should.be.rejected;            
            
        })
       

        it ('Deleting cinema hall should fail if invalid cinema id passed', async ()=>{
            await movieReview.deleteCinemaHall(2,{from: deployer}).should.be.rejected;
            
        })


        it ('Deleting cinema hall should be successfull if done by owner', async ()=>{
            result =  await movieReview.deleteCinemaHall(1,{from: deployer});
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), cinemaHallNumber.toNumber(), 'Cinema Hall id is correct');
            assert.equal(event.locationId.toNumber(), 2, 'Location id is correct');
            assert.equal(event.name, 'North Vancouver','Cinema Hall name is correct');
            assert.equal(event.active, false,'status is correct');
            
        })

        it ('Deleting cinema hall should fail if already inactive', async ()=>{
            await movieReview.deleteCinemaHall(1,{from: deployer}).should.be.rejected;
            
        })
        
    })


    describe('Adding and deleting Movie', async()=>{
        let result, cinemaHallNumber
        
        before(async ()=>{
            result = await movieReview.addCinemaHall('West Vancouver', 2,{from: deployer})
            cinemaHallNumber = await movieReview.cinemaHallNumber()
        })
        it ('Adding movie should be successful if all correct and done by owner', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;
            let enddate = (new Date("2020-04-05")).getTime();            
            let endDateInUnixTimestamp = enddate / 1000;

            result = await movieReview.addMovie('Star Wars 2020', 2, startDateInUnixTimestamp, endDateInUnixTimestamp, 2, 5, {from: deployer})
            movieNumber = await movieReview.movieNumber()
            assert.equal(movieNumber,1);
            const event = result.logs[0].args;

            assert.equal(event.id.toNumber(), movieNumber.toNumber(), 'Movie id is correct');
            assert.equal(event.cinemaHallId.toNumber(), 2, 'Cinema Hall id is correct');
            assert.equal(event.name, 'Star Wars 2020','Movie name is correct');
            //let _startdate = new Date(event.startDate * 1000);
            //let _enddate = new Date(event.endDate * 1000);
            assert.equal(event.startDate.toNumber(), startDateInUnixTimestamp,'Start date is correct');
            assert.equal(event.endDate.toNumber(), endDateInUnixTimestamp,'End date is correct');
            assert.equal(event.startTime.toNumber(), 2, 'Start time is correct');
            assert.equal(event.totalTime.toNumber(), 5, 'Total time is correct');        
            assert.equal(event.active, true,'status is correct');
        })

     
        it ('Adding movie should fail if name not given', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;
            let enddate = (new Date("2020-04-05")).getTime();            
            let endDateInUnixTimestamp = enddate / 1000;
            
            await movieReview.addMovie('', 2, startDateInUnixTimestamp, endDateInUnixTimestamp, 2, 5,{from: deployer}).should.be.rejected;
            
        })

        it ('Adding movie should fail if  cinema hall is inactive or invalid', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;
            let enddate = (new Date("2020-04-05")).getTime();            
            let endDateInUnixTimestamp = enddate / 1000;
            
            await movieReview.addMovie('Star Wars 2020', 1, startDateInUnixTimestamp, endDateInUnixTimestamp, 2, 5,{from: deployer}).should.be.rejected;
            await movieReview.addMovie('Star Wars 2020', 3, startDateInUnixTimestamp, endDateInUnixTimestamp, 2, 5,{from: deployer}).should.be.rejected;
            
        })

        it ('Adding movie should fail if  movie with same details already exists', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;
            let enddate = (new Date("2020-04-05")).getTime();            
            let endDateInUnixTimestamp = enddate / 1000;
            
            await movieReview.addMovie('Star Wars 2020', 2, startDateInUnixTimestamp, endDateInUnixTimestamp, 2, 5, {from: deployer}).should.be.rejected;
            
        })

        it ('Deleting movie should fail if invalid movie id passed', async ()=>{
            await movieReview.removeMovie(4,{from: deployer}).should.be.rejected;
            
        })


        it ('Deleting movie should be successfull if done by owner', async ()=>{
            result =  await movieReview.removeMovie(1,{from: deployer});
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), movieNumber.toNumber(), 'Movie id is correct');
            assert.equal(event.cinemaHallId.toNumber(), 2, 'Cinema Hall id is correct');
            assert.equal(event.name, 'Star Wars 2020','Movie name is correct');                 
            assert.equal(event.active, false,'status is correct');
            
        })
        it ('Deleting movie should fail if already inactive', async ()=>{
            await movieReview.removeMovie(1,{from: deployer}).should.be.rejected;
            
        })     
        
    })

    describe('Sign UP Tests', async()=>{
        it ('Sign up should be successful if all correct', async ()=>{
            
            result = await movieReview.signUp('Anupreet', 'anupreet@gmail.com', 'test_password', {from: user1})
            let userNumber = await movieReview.userNumber()
            assert.equal(userNumber,1);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), userNumber.toNumber(), 'User id is correct');
            assert.equal(event.name, 'Anupreet', 'Name is correct');
            assert.equal(event.email, 'anupreet@gmail.com','Email is correct');
            assert.equal(event.password, 'test_password','Password is correct');
            
        })
        

        it ('Signup should be unsuccessfull if name not given', async ()=>{
            
            await movieReview.signUp('', 'anupreet@gmail.com', 'test_password', {from: user1}).should.be.rejected;
            
        })

        it ('Signup should fail if email not given', async ()=>{
            
            await movieReview.signUp('Anu', '', 'test_password', {from: user1}).should.be.rejected;
            
        })

        it ('Signup should fail if password not given', async ()=>{
            
            await movieReview.signUp('Anu', 'anu@gmail.com', '', {from: user1}).should.be.rejected;
            
        })


        it ('Signup should fail if  user with same details already exists', async ()=>{
           
            await movieReview.signUp('Anupreet', 'anupreet@gmail.com', 'test_password', {from: user1}).should.be.rejected;
           
        })

    })

    describe('Booking and Cancelling Movie ticket tests', async()=>{
        
        before(async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;
            let enddate = (new Date("2020-04-05")).getTime();            
            let endDateInUnixTimestamp = enddate / 1000;

            result = await movieReview.addMovie('Star Wars 2020 Part 2', 2, startDateInUnixTimestamp, endDateInUnixTimestamp, 2, 5, {from: deployer})
            movieNumber = await movieReview.movieNumber()
        })
        
        it ('Booking movie should be successful if all correct', async ()=>{          
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;

            result = await movieReview.bookMovieTicket(1,  2, 2, startDateInUnixTimestamp, 2, {from: user1, value: web3.utils.toWei('0.5', 'Ether')})
            bookingNumber = await movieReview.bookingNumber()
            assert.equal(bookingNumber,1);

            const event = result.logs[0].args;
            assert.equal(event.bookingId.toNumber(), bookingNumber.toNumber(), 'Booking id is correct');
            assert.equal(event.userId.toNumber(), 1, 'User id is correct');
            assert.equal(event.movieId.toNumber(), 2, 'Movie id is correct');
            assert.equal(event.cinemaHallID.toNumber(), 2, 'cinemaHallID id is correct');           
            assert.equal(event.date.toNumber(), startDateInUnixTimestamp,'Start date is correct');                   
            assert.equal(event.cancelled, false,'status is correct');
        })
    

        it ('Booking movie should fail if invalid userid', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;

            await movieReview.bookMovieTicket(4,  2, 2, startDateInUnixTimestamp, 2, {from: user1, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
            
        })

        it ('Booking movie should fail if invalid movie id', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;

            await movieReview.bookMovieTicket(1,  4, 2, startDateInUnixTimestamp, 2, {from: user1, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
            
        })

        it ('Booking movie should fail if  cinema hall is  invalid', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;

            await movieReview.bookMovieTicket(1,  2, 4, startDateInUnixTimestamp, 2, {from: user1, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
            
        })

        it ('Booking movie should fail if  movie status is inactive', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;

            await movieReview.bookMovieTicket(1,  1, 2, startDateInUnixTimestamp, 2, {from: user1, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
            
        })

        it ('Booking movie should fail if payment is not enough', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;

            await movieReview.bookMovieTicket(1,  2, 2, startDateInUnixTimestamp, 2, {from: user1, value: web3.utils.toWei('0.4', 'Ether')}).should.be.rejected;
            
        })

        it ('Booking movie should fail if called by user', async ()=>{
            await movieReview.removeMovie(1,{from: user1}).should.be.rejected;
            
        })

        it ('Cancelling movie booking should fail if user not valid', async ()=>{
            await movieReview.cancelMovieTicket(5,2,{from: user1}).should.be.rejected;
            
        })     
        it ('Cancelling movie booking should fail if movie invalid', async ()=>{
            await movieReview.cancelMovieTicket(1,5, {from: user1}).should.be.rejected;
            
        })     

        
        it ('Cancelling movie booking should be successfull if everything is fine', async ()=>{
            movieBookings = await movieReview.movieBookings(1)
            result =  await movieReview.cancelMovieTicket(1, 2,{from: user1});
            const event = result.logs[0].args;
            assert.equal(event.bookingId.toNumber(), 1, 'Booking id is correct');
            assert.equal(event.userId.toNumber(), 1, 'User id is correct');
            assert.equal(event.movieId.toNumber(), 2, 'Movie id is correct');
            assert.equal(event.cancelled, true,'status is correct');
            
        })
        it ('Cancelling movie booking should fail if already cancelled', async ()=>{
            await movieReview.cancelMovieTicket(1, 2,{from: user1}).should.be.rejected;
            
        })     
        
    })

    describe('Check In Checkout tests', async()=>{
        
        before(async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;

            result = await movieReview.bookMovieTicket(1,  2, 2, startDateInUnixTimestamp, 2, {from: user1, value: web3.utils.toWei('0.5', 'Ether')})
            bookingNumber = await movieReview.bookingNumber()
            assert.equal(bookingNumber,2);
        })
        
        

        it ('checkIn should fail if invalid userid', async ()=>{
            var today = new Date();
            time = today.getTime();
            await movieReview.checkIn(5,  2, time,  {from: user1}).should.be.rejected;
            
        })

        it ('checkIn should fail if invalid movie id', async ()=>{
            var today = new Date();
            time = today.getTime();
            await movieReview.checkIn(1,  5, time, {from: user1}).should.be.rejected;
            
        })

        it ('CheckIn should be successful if all correct', async ()=>{          
            var today = new Date();
            time = today.getTime();
            result = await movieReview.checkIn(1,  2, time, {from: user1})
            checkInCheckOutNumber = await movieReview.checkInCheckOutNumber()
            assert.equal(checkInCheckOutNumber,1);

            const event = result.logs[0].args;
            assert.equal(event.cid.toNumber(), checkInCheckOutNumber.toNumber(), 'checkInCheckOutNumber is correct');
            assert.equal(event.userId.toNumber(), 1, 'User id is correct');
            assert.equal(event.movieId.toNumber(), 2, 'Movie id is correct');                 
            assert.equal(event.checkInTime.toNumber(), time,'Check In Time is correct');
        })

        it ('checkIn should fail if  user has already checked in', async ()=>{
            var today = new Date();
            time = today.getTime();
            await movieReview.checkIn(1,  2, time, {from: user1}).should.be.rejected;
        })
        

        it ('checkout should be successfull is all info is correct', async ()=>{

            // Movie total time for movie id 2 is set as 5 minutes.
            // assuming checkout is done after 1 minute of checkin rating should be 2 (out of 10)
            await new Promise(r => setTimeout(r, 60000));
            var today = new Date();
            time = today.getTime();

            result = await movieReview.checkOut(1,  2, time, 'Boring', {from: user1});
            const event = result.logs[1].args;
            userCheckInCheckouts = await movieReview.userCheckInCheckouts(1);
            assert.equal(event.cid.toNumber(), 1, 'checkInCheckOutNumber is correct');
            assert.equal(event.userId.toNumber(), 1, 'User id is correct');
            assert.equal(event.movieId.toNumber(), 2, 'Movie id is correct');                 
            assert.equal(event.checkInTime.toNumber(), userCheckInCheckouts.checkInTime,'Check In Time is correct');
            assert.equal(event.checkOutTime.toNumber(), time,'Check Out Time is correct');


            const event1 = result.logs[0].args;

            assert.equal(event1.reviewId.toNumber(), 1, 'reviewId is correct');
            assert.equal(event1.userId.toNumber(), 1, 'User id is correct');
            assert.equal(event1.movieId.toNumber(), 2, 'Movie id is correct');                 
            assert.equal(event1.rating.toNumber(), 2,'Rating is correct');
            assert.equal(event1.review, 'Boring','Review is correct');
            
        })

        
        it ('check Out should fail if user id is invalid', async ()=>{
            var today = new Date();
            time = today.getTime();
            await movieReview.checkOut(7,  2, time, 'Boring', {from: user1}).should.be.rejected;
            
        })

        it ('check Out should fail if movie id is invalid', async ()=>{
            var today = new Date();
            time = today.getTime();
            await movieReview.checkOut(1,  7, time, 'Boring', {from: user1}).should.be.rejected;
            
        })

        it ('check Out  should fail if user has already checked out', async ()=>{
            var today = new Date();
            time = today.getTime();

            await movieReview.checkOut(1,  2, time, 'Boring', {from: user1}).should.be.rejected;
            
        });     
        it ('check Out should fail if user has not checked in ', async ()=>{
            let startdate = (new Date("2020-04-01")).getTime();
            let startDateInUnixTimestamp = startdate / 1000;
            await movieReview.signUp('Anu', 'anu@gmail.com', 'test_password', {from: user2})
            await movieReview.bookMovieTicket(2,  2, 2, startDateInUnixTimestamp, 2, {from: user2, value: web3.utils.toWei('0.5', 'Ether')})
            var today = new Date();
            time = today.getTime();

            await movieReview.checkOut(2,  2, time, 'Boring', {from: user2}).should.be.rejected;
            
        });     
               
    });
    
});
