pragma solidity ^0.5.0;

contract MovieReview {
    
    string public companyName;
    address payable public owner;
    uint public locationNumber = 0;
    uint public cinemaHallNumber = 0;
    uint public movieNumber = 0;
    uint public userNumber = 0;
    uint public bookingNumber = 0;
    uint public checkInCheckOutNumber = 0;
    uint public reviewNumber = 0;
    
    struct Location {
        uint id;
        string name;
        bool active;
    }

    struct CinemaHall {
        uint id;
        uint locationId;
        string name;
        bool active;
    }

    struct Movie {
        uint id;
        uint cinemaHallId;
        string name;
        uint startDate;
        uint endDate;
        uint startTime;
        uint totalTime;
        bool active;
    }

    struct UserDetail {
        uint id;
        string name;
        string email;
        string password;
    }

    struct MovieBooking {
        uint bookingId;
        uint userId;
        uint movieId;
        uint cinemaHallID;
        uint date;
        uint startTime;
        bool cancelled;
    }

    struct UserCheckInCheckout {
        uint cid;
        uint userId;
        uint movieId;
        uint checkInTime;
        uint checkOutTime;

    }

    struct Review {
        uint reviewId;
        uint userId;
        uint movieId;
        uint rating;
        string review;
    }

    mapping(uint => Location) public locations;
    mapping(uint => CinemaHall) public cinemaHalls;
    mapping(uint => Movie) public movies;
    mapping(uint => UserDetail) public userDetails;
    mapping(uint => MovieBooking) public movieBookings;
    mapping(uint => UserCheckInCheckout) public userCheckInCheckouts;
    mapping(uint => Review) public reviews;

    event LocationAdded(
        uint id,
        string name,
        bool active
    );

    event LocationDeleted(
        uint id,
        string name,
        bool active
    );

    event CinemaHallAdded(
        uint id,
        uint locationId,
        string name,
        bool active
    );

    event CinemaHallDeleted(
        uint id,
        uint locationId,
        string name,
        bool active
    );

    event MovieAdded(
        uint id,
        uint cinemaHallId,
        string name,
        uint startDate,
        uint endDate,
        uint startTime,
        uint totalTime,
        bool active
    );

    event MovieDeleted(
        uint id,
        uint cinemaHallId,
        string name,
        uint startDate,
        uint endDate,
        uint startTime,
        uint totalTime,
        bool active
    );

    event MovieUpdated(
        uint id,
        uint cinemaHallId,
        string name,
        uint startDate,
        uint endDate,
        uint startTime,
        uint totalTime,
        bool active
    );

    event NewUserAdded(
        uint id,
        string name,
        string email,
        string password
    );

    event MovieBooked(
        uint bookingId,
        uint userId,
        uint movieId,
        uint cinemaHallID,
        uint date,
        uint startTime,
        bool cancelled
    );

    event MovieBookingCancelled(
        uint bookingId,
        uint userId,
        uint movieId,
        uint date,
        bool cancelled
    );

    event CheckInDone(
        uint cid,
        uint userId,
        uint movieId,
        uint checkInTime
    );

    event CheckOutDone(
        uint cid,
        uint userId,
        uint movieId,
        uint checkInTime,
        uint checkOutTime
    );

    event ReviewAdded(
        uint reviewId,
        uint userId,
        uint movieId,
        uint rating,
        string review
    );
    
    constructor() public {
        companyName = "CinePlaza Movies";
        owner = msg.sender;
    }

    function addLocation(string memory _locationName) public {
        require(bytes(_locationName).length > 0, "Location's name is required");
        //require(msg.sender == owner, "Only owner can add location");

        uint256 count = 0;
        if(locationNumber > 0)
        {
            for (uint256 i = 1; i <= locationNumber; i++) {
                if(keccak256(bytes(locations[i].name)) == keccak256(bytes(_locationName)))
                {
                    count++;
                }
            }
        }
        require(count == 0, "Location with same name already exist");

        locationNumber++;
        locations[locationNumber] = Location(locationNumber, _locationName, true);
        emit LocationAdded(locationNumber, _locationName, true);
    }
    
    function deleteLocation(uint _id) public {
        require(_id > 0 && _id <= locationNumber, 'Location should be valid');
        Location memory _location = locations[_id];
        require(_location.active != false, 'Location is already inactive');
        //require(msg.sender == owner, "Only owner can delete location");

        _location.active = false;
        locations[_id] = _location;

        emit LocationDeleted(_location.id, _location.name, _location.active);
    }


    function addCinemaHall(string memory _name, uint _locationID ) public {
        require(bytes(_name).length > 0, "Cinema Hall's name is required");
        //require(msg.sender == owner, "Only owner can add cinema hall");
        require(_locationID > 0 && _locationID <= locationNumber, 'Location should be valid');
        Location memory _location = locations[_locationID];
        require(_location.active != false, 'Location status is inactive');

        uint256 count;
        if(cinemaHallNumber > 0)
        {
            for (uint256 i = 1; i <= cinemaHallNumber; i++) {
                if(keccak256(bytes(cinemaHalls[i].name)) == keccak256(bytes(_name)) && cinemaHalls[i].locationId == _locationID)
                {
                    count++;
                }
            }
        }
        require(count == 0, "Cinema Hall with same name already exist in the given Location");

        cinemaHallNumber++;
        cinemaHalls[cinemaHallNumber] = CinemaHall(cinemaHallNumber, _locationID, _name, true);
        emit CinemaHallAdded(cinemaHallNumber, _locationID, _name, true);
    }

    function deleteCinemaHall(uint _id) public {
        require(_id > 0 && _id <= cinemaHallNumber, 'Cinema Hall should be valid');
        CinemaHall memory _cinemaHall = cinemaHalls[_id];
        require(_cinemaHall.active != false, 'Cinema Halls status is already inactive');
        //require(msg.sender == owner, "Only owner can delete cinema hall");

        _cinemaHall.active = false;
        cinemaHalls[_id] = _cinemaHall;

        emit CinemaHallDeleted(_cinemaHall.id, _cinemaHall.locationId, _cinemaHall.name, _cinemaHall.active);
    }


    function addMovie(string memory _name, uint _cinemaHallID, uint _startDate, uint _endDate, uint _startTime, uint _totalTime) public {
        require(bytes(_name).length > 0, "Movie's name is required");
        //require(msg.sender == owner, "Only owner can add movie");
        require(_cinemaHallID > 0 && _cinemaHallID <= cinemaHallNumber, 'Cinema Hall should be valid');
        CinemaHall memory _cinemaHall = cinemaHalls[_cinemaHallID];
        require(_cinemaHall.active != false, 'Cinema Hall status is inactive');

        uint256 count;
        for (uint256 i = 1; i <= movieNumber; i++) {
            if(keccak256(bytes(movies[i].name)) == keccak256(bytes(_name)) && movies[i].cinemaHallId == _cinemaHallID  && movies[i].startDate == _startDate && movies[i].endDate == _endDate && movies[i].startTime == _startTime && movies[i].active == true )
            {
                count++;
            }
        }
        require(count == 0, "Movie with same  details alredy exists");

        movieNumber++;
        movies[movieNumber] = Movie(movieNumber, _cinemaHallID, _name, _startDate, _endDate, _startTime, _totalTime, true);
        emit MovieAdded(movieNumber, _cinemaHallID, _name, _startDate, _endDate, _startTime, _totalTime, true);
    }

    function removeMovie(uint _id) public {
        require(_id > 0 && _id <= movieNumber, 'Movie should be valid');
        Movie memory _movie = movies[_id];
        require(_movie.active != false, 'Movie status is already inactive');
        //require(msg.sender == owner, "Only owner can remove movie");

        _movie.active = false;
        movies[_id] = _movie;

        emit MovieDeleted(_movie.id, _movie.cinemaHallId, _movie.name, _movie.startDate, _movie.endDate, _movie.startTime, _movie.totalTime, _movie.active);
    }

    function updateMovie(uint _id, uint _startDate, uint _endDate, uint _startTime, uint _totalTime) public {
        require(_id > 0 && _id <= movieNumber, 'Movie should be valid');
        Movie memory _movie = movies[_id];
        require(_movie.active != false, 'Movie status is already inactive');
        //require(msg.sender == owner, "Only owner can update movie");
        uint256 count;
        if(movies[_id].startDate == _startDate && movies[_id].endDate == _endDate && movies[_id].startTime == _startTime && movies[_id].active == true )
        {
            count++;
        }
        require(count == 0, "Movie with same  details alredy exists");
        _movie.startDate = _startDate;
        _movie.endDate = _endDate;
        _movie.startTime = _startTime;
        _movie.totalTime = _totalTime;

        movies[_id] = _movie;
        emit MovieUpdated(_movie.id, _movie.cinemaHallId, _movie.name, _movie.startDate, _movie.endDate, _movie.startTime, _movie.totalTime, _movie.active);
    }

    function signUp(string memory _name, string memory _email, string memory _password) public {
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_password).length > 0, "Password is required");
        
        uint256 count = 0;
        if(userNumber > 0) {
            for (uint256 i = 1; i <= userNumber; i++) {
                if(keccak256(bytes(userDetails[i].name)) == keccak256(bytes(_name)) && keccak256(bytes(userDetails[i].email)) == keccak256(bytes(_email)))
                {
                    count = 1;
                }
            }
        }
        require(count == 0, "User already exists");

        userNumber++;
        userDetails[userNumber] = UserDetail(userNumber, _name, _email, _password);
        emit NewUserAdded(userNumber, _name, _email, _password);
    }


    function bookMovieTicket(uint _userId, uint _movieId, uint _cinemaHallId, uint _date, uint _time) public payable {
        require(_userId > 0 && _userId <= userNumber, 'User should be valid');
        require(_movieId > 0 && _movieId <= movieNumber, 'Movie should be valid');
        require(_cinemaHallId > 0 && _cinemaHallId <= cinemaHallNumber, 'Cinema Hall should be valid');
        
        Movie memory _movie = movies[_movieId];
        require(_movie.active != false, 'Movie status is  inactive');
        uint value = 500000000000000000;
        require(msg.value >= value, "Payment should be enough i.e. 0.5 ETHER!");
        bookingNumber++;
        owner.transfer(msg.value);
        movieBookings[bookingNumber] = MovieBooking(bookingNumber, _userId, _movieId, _cinemaHallId, _date, _time, false);
        emit MovieBooked(bookingNumber, _userId, _movieId, _cinemaHallId, _date, _time, false);
    }

    function cancelMovieTicket(uint _userId, uint _movieId) public payable {
        require(_userId > 0 && _userId <= userNumber, 'User should be valid');
        require(_movieId > 0 && _movieId <= movieNumber, 'Movie should be valid');
        uint256 bookingId;
        for (uint256 i = 1; i <= bookingNumber; i++) {
            if(movieBookings[i].userId == _userId && movieBookings[i].movieId == _movieId)
            {
                bookingId = i;
            }
        }

        MovieBooking memory _movieBooking = movieBookings[bookingId];
        require(_movieBooking.cancelled != true, 'Movie booking is already cancelled');

        _movieBooking.cancelled = true;
        movieBookings[bookingId] = _movieBooking;

        //address payable customer = msg.sender;
        //uint value = 500000000000000000;
        //customer.transfer(value);
        emit MovieBookingCancelled(bookingId, _movieBooking.userId, _movieBooking.movieId, _movieBooking.date,  true);
    }

    function checkIn(uint _userId, uint _movieId, uint _checkInTime) public {
        require(_userId > 0 && _userId <= userNumber, 'User should be valid');
        require(_movieId > 0 && _movieId <= movieNumber, 'Movie should be valid');
        Movie memory _movie = movies[_movieId];
        require(_movie.active != false, 'Movie status is  inactive');
        uint256 bookingId;
         if(bookingNumber > 0) {
        for (uint256 i = 1; i <= bookingNumber; i++) {
            if(movieBookings[i].userId == _userId && movieBookings[i].movieId == _movieId && movieBookings[i].cancelled == false)
            {
                bookingId = i;
            }
        }
         }
        MovieBooking memory _movieBooking = movieBookings[bookingId];
        require(_movieBooking.cancelled != true, 'Movie booking is already cancelled');

        uint256 count;
        if(checkInCheckOutNumber > 0) {
        for (uint256 i = 1; i <= checkInCheckOutNumber; i++) {
            if(userCheckInCheckouts[i].userId == _userId && userCheckInCheckouts[i].movieId == _movieId)
            {
                count = i;
            }
        }
         }
        require(count == 0, 'User has already checked in');

        checkInCheckOutNumber++;
        userCheckInCheckouts[checkInCheckOutNumber] = UserCheckInCheckout(checkInCheckOutNumber, _userId, _movieId, _checkInTime, 0);
        emit CheckInDone(checkInCheckOutNumber, _userId, _movieId, _checkInTime);
    }

    function checkOut(uint _userId, uint _movieId, uint _checkOutTime, string memory _review) public {
        require(_userId > 0 && _userId <= userNumber, 'User should be valid');
        require(_movieId > 0 && _movieId <= movieNumber, 'Movie should be valid');
        Movie memory _movie = movies[_movieId];
        require(_movie.active != false, 'Movie status is  inactive');
        uint256 bookingId;
        for (uint256 i = 1; i <= bookingNumber; i++) {
            if(movieBookings[i].userId == _userId && movieBookings[i].movieId == _movieId)
            {
                bookingId = i;
            }
        }
        MovieBooking memory _movieBooking = movieBookings[bookingId];
        require(_movieBooking.cancelled != true, 'Movie booking is already cancelled');

        uint256 cid = 0;
        for (uint256 i = 1; i <= checkInCheckOutNumber; i++) {
            if(userCheckInCheckouts[i].userId == _userId && userCheckInCheckouts[i].movieId == _movieId)
            {
                cid = i;
            }
        }
        require(cid != 0, 'User has not checked in');
        require(userCheckInCheckouts[cid].checkOutTime == 0, 'User has already checked out');
        UserCheckInCheckout memory _checkInCheckout = userCheckInCheckouts[cid];
        _checkInCheckout.checkOutTime = _checkOutTime;

        userCheckInCheckouts[cid] = _checkInCheckout;
        uint checkInTime = _checkInCheckout.checkInTime;

        calculateRatingBasedOnTime(_userId, _movieId, checkInTime, _checkOutTime,  _movie.totalTime, _review);
        emit CheckOutDone(cid, _userId, _movieId, checkInTime, _checkOutTime);
    }

    function calculateRatingBasedOnTime( uint _userId, uint _movieId, uint _checkInTime, uint _checkOutTime, uint movieLength, string memory _review) public {
        reviewNumber++;
        uint rating;
        uint time_in_min = ((_checkOutTime-_checkInTime)*10)/(1000*60);
        rating = (time_in_min)/movieLength;
        reviews[reviewNumber] = Review(reviewNumber, _userId, _movieId, rating, _review);
        emit ReviewAdded(reviewNumber, _userId, _movieId, rating, _review);
    }
}