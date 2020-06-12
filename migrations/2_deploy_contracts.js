const MovieReview = artifacts.require("MovieReview");

module.exports = function(deployer) {
  deployer.deploy(MovieReview);
};
