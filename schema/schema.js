const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { wpClients, client, clients } = require("../query/clients");
const { projects, project, clientProjects } = require("../query/projects");
const { user, users } = require("../query/users");
const { destination, destinations } = require("../query/destinations");
const { singleContinent, continents } = require("../query/continents");
const { countries, singleCountry, country, country_by_slug } = require("../query/countries");
const {
  cities,
  cityByDivision,
  getCity,
  getCityByCountry,
  getCityWithTourSpots,
} = require("../query/cities");
const { divisionByCountry, divisions,division } = require("../query/divisions");
const {
  singleCountryTourspotList,
  singleTourspot,
  singleTourspotDetails,
  tourSpots,
  relatedTourSpots,
  tourSpotsByCountryId,
  tourSpotsPagination
} = require("../query/tourspots");
const { reviesByTourSpot, newReviews } = require("../query/reviews");
const {
  getTourGuide,
  tourGuideProfile,
  tourGuidePlace,
  getGuideContributions,
  getGuideReservs,
  getGuideReserve,
  getGuidePlaceImages,
  getTourGuides,
} = require("../query/tourGuideQuery");

const {
  addClient,
  deleteClient,
  loginClient,
  updateClientPassword,
  clientPasswordReset,
  addClientImage,
} = require("../mutation/client");
const {
  addProject,
  updateProject,
  deleteProject,
} = require("../mutation/project");
const { addUser, updateUser, deleteUser } = require("../mutation/user");
const {
  addDestination,
  updateDestination,
  deleteDestination,
} = require("../mutation/destination");
const { addCountry, updateCountry } = require("../mutation/country");
const {
  addTourSpot,
  updateTourspot,
  deleteTourspot,
  deleteTourSpotWithCommentReply,
} = require("../mutation/tourSpot");
const { addDivision, updateDivision } = require("../mutation/division");
const { addCity, updateCity } = require("../mutation/city");
const {
  addReview,
  addReviewReply,
  addReply,
  deleteReviewWithReply,
  updateReview,
  updateReply,
  deleteReply,
} = require("../mutation/review");
const {
  addTourGuideProfile,
  updateTourGuideProfile,
  uploadTourImages,
  addGuideTourplace,
  addTourGuideContributionDetail,
  addTourGuideReserve,
  updateTourGuidePlce,
  updateGuideReserve,
  addProfileImage,
} = require("../mutation/tourGuide/tourGuideMutation");
const { addContinent } = require("../mutation/continet");

//main query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // projects
    projects,
    project,
    clientProjects,
    wpClients,
    // clients
    client,
    clients,
    // users
    users,
    user,
    // destinations
    destinations,
    destination,
    // continents
    singleContinent,
    continents,
    // countries
    countries,
    singleCountry,
    country,
    country_by_slug,
    // tourspot
    singleCountryTourspotList,
    singleTourspot,
    singleTourspotDetails,
    tourSpots,
    relatedTourSpots,
    tourSpotsByCountryId,
    tourSpotsPagination,
    // cities
    cities,
    cityByDivision,
    getCity,
    getCityByCountry,
    getCityWithTourSpots,
    // divisions
    divisionByCountry,
    divisions,
    division,
    // reviews
    reviesByTourSpot,
    newReviews,
    // tour guide
    getTourGuide,
    tourGuideProfile,
    tourGuidePlace,
    getGuideContributions,
    getGuideReservs,
    getGuideReserve,
    getGuidePlaceImages,
    getTourGuides,
  },
});

//mutation for create delete update operation
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //client
    addClient,
    deleteClient,
    loginClient,
    updateClientPassword,
    clientPasswordReset,
    addClientImage,
    //project
    addProject,
    deleteProject,
    updateProject,
    // user
    addUser,
    deleteUser,
    updateUser,
    // destination
    addDestination,
    updateDestination,
    deleteDestination,
    // country
    addCountry,
    updateCountry,
    // tourspot
    addTourSpot,
    updateTourspot,
    deleteTourspot,
    deleteTourSpotWithCommentReply,
    // city
    addCity,
    updateCity,
    // division
    addDivision,
    updateDivision,
    // review
    addReview,
    addReviewReply,
    addReply,
    deleteReviewWithReply,
    updateReview,
    updateReply,
    deleteReply,
    // tourGuide
    addTourGuideProfile,
    updateTourGuideProfile,
    uploadTourImages,
    addGuideTourplace,
    addTourGuideContributionDetail,
    addTourGuideReserve,
    updateTourGuidePlce,
    updateGuideReserve,
    addProfileImage,
    // continet
    addContinent
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
