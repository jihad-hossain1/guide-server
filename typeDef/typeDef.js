const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require("graphql");
const { Kind } = require("graphql/language");
const Country = require("../models/Country");
const Division = require("../models/Division");
const City = require("../models/City");
const TourSpot = require("../models/TourSpot");
const Review = require("../models/Review");
const GuideReview = require("../models/GuideReview");
const TourGuide = require("../models/TourGuide");
const Images = require("../models/Images");
const {
  TourGuideContributionType,
  ImgaeInput,
  ImagesInput,
  TourGuideContributionDetailType,
  TourGuideReserveType,
} = require("./extraTypeDef");
const TourGuideContribution = require("../models/TourGuideContribution");
const {
  TourGuideContributionDetail,
} = require("../models/TourGuideContributionDetail");
const TourGuideReserve = require("../models/TourGuideReserve");
const Client = require("../models/Client");

const TimestampType = new GraphQLScalarType({
  name: "Timestamp",
  serialize(date) {
    return date instanceof Date ? date.getTime() : null;
  },
  parseValue(date) {
    try {
      return new Date(value);
    } catch (error) {
      return null;
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    } else if (ast.kind === Kind.STRING) {
      return this.parseValue(ast.value);
    } else {
      return null;
    }
  },
});

const ProjectType = new GraphQLObjectType({
  name: "Projects",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    details: { type: GraphQLString },
    status: { type: GraphQLString },
    clientId: { type: GraphQLID },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const ClientType = new GraphQLObjectType({
  name: "Clients",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    image: { type: GraphQLString },
    role: { type: GraphQLString },
    clientType: { type: GraphQLString },
    clientProfile: {
      type: TourGuideType,
      resolve: async (parent, args) => {
        try {
          const result = await TourGuide.findOne({ clientId: parent.id });
          return result;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    photo: { type: GraphQLString },
  }),
});

const DestinationType = new GraphQLObjectType({
  name: "Destination",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    photo: { type: GraphQLString },
    location: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const TourSpotType = new GraphQLObjectType({
  name: "TourSpot",
  fields: () => ({
    id: { type: GraphQLID },

    name: { type: GraphQLString },

    slug: {type: GraphQLString},

    description: { type: GraphQLString },

    photo: { type: GraphQLString },

    cityId: { type: GraphQLID },

    countryId: { type: GraphQLID },

    divisionId: { type: GraphQLID },

    perfectTourTime: { type: GraphQLString },

    howToGoThere: { type: GraphQLString },

    howToStayThere: { type: GraphQLString },

    howDoHere: { type: GraphQLString },

    whereToEat: { type: GraphQLString },

    tourTipsGuide: { type: GraphQLString },

    topTourPlace: { type: GraphQLString },

    city: {
      type: CityForAdd,
      resolve: async (parent, args) => {
        try {
          let _i = await City.find();
          let result = _i?.find((item) => item?.id == parent.cityId);
          return result;
        } catch (error) {
          throw new Error("Error fetching city name");
        }
      },
    },

    code: { type: GraphQLString },

    country: {
      type: CountryType,
      resolve: async (parent, args) => {
        try {
          let _i = await Country.find();
          let result = _i?.find((item) => item?.id == parent.countryId);
          return result;
        } catch (error) {
          throw new Error("Error fetching country name");
        }
      },
    },

    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ _id: { $in: parent?.reviews } });
      },
    },
  }),
});

const CityType = new GraphQLObjectType({
  name: "City",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    touristSpots: {
      type: new GraphQLList(TourSpotType),
      resolve: async (parent, args) => {
        let _i = await TourSpot.find();
        let result = _i?.filter((item) => item?.cityId == parent.id);
        return result;
      },
    },
    description: { type: GraphQLString },
    divisionId: { type: GraphQLID },
    photo: { type: new GraphQLList(GraphQLString) },
  }),
});

const CityForAdd = new GraphQLObjectType({
  name: "AddCity",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    photo: { type: GraphQLString },
    divisionId: { type: GraphQLID },
    countryId: { type: GraphQLID },
    division: {
      type: DivisionType,
      resolve: async (parent, args) => {
        let _i = await Division.findById(parent.divisionId);
        return _i;
      },
    },
    totalTourSpots: {
      type: new GraphQLList(TourSpotType),
      resolve: async (parent, args) => {
        try {
          const _i = await TourSpot.find({ cityId: parent.id });
          // console.log(_i);
          return _i;
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  }),
});

const DivisionType = new GraphQLObjectType({
  name: "Division",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: {
      type: CountryType,
      resolve: async (parent, args) => {
        return await Country.findById(parent.countryId);
      },
    },
    countryId: { type: GraphQLID },

    description: { type: GraphQLString },
    photo: { type: GraphQLString },
    cities: {
      type: new GraphQLList(CityType),
      resolve: async (parent, args) => {
        let _i = await City.find();
        let result = _i?.filter((item) => item?.divisionId == parent.id);
        return result;
      },
    },
  }),
});

const CountryType = new GraphQLObjectType({
  name: "Country",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    photo: { type: GraphQLString },
    continentId: { type: GraphQLID },

    touristSpots: {
      type: new GraphQLList(TourSpotType),
      resolve: async (parent, args) => {
        let tourt = await TourSpot.find();
        let result = tourt?.filter((item) => item?.countryId === parent.id);
        return result;
      },
    },
    division: {
      type: new GraphQLList(DivisionType),
      resolve: async (parent, args) => {
        let _i = await Division.find();
        let result = _i?.filter((item) => item?.countryId == parent.id);
        return result;
      },
    },
    city: {
      type: new GraphQLList(CityType),
      resolve: async (parent, args) => {
        let _i = await City.find();
        let result = _i?.filter((item) => item.division == parent.divisionId);
        return result;
      },
    },
    cities: {
      type: new GraphQLList(CityForAdd),
      resolve: async (parent, args) => {
        let _i = await City.find({ countryId: parent.id });
        console.log(_i);
        return _i;
      },
    },
  }),
});

const ContinentType = new GraphQLObjectType({
  name: "Continent",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    img: { type: GraphQLString },
    countries: {
      type: new GraphQLList(CountryType),
      resolve: async (parent, args) => {
        let _i = await Country.find();
        let result = _i?.filter((item) => item?.continentId == parent.id);
        return result;
      },
    },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "Reviews",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    tourSpotId: { type: GraphQLID },
    rating: { type: GraphQLInt },
    createdAt: { type: TimestampType },
    replies: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ _id: { $in: parent.replies } });
      },
    },
  }),
});

const ReviewReplyType = new GraphQLObjectType({
  name: "Reply",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    tourSpotId: { type: GraphQLID },
    reviewId: { type: GraphQLID },
  }),
});

const GuideReviewType = new GraphQLObjectType({
  name: "GuideReview",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    guideId: { type: GraphQLID },
    rating: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    replies: {
      type: new GraphQLList(GuideReviewType),
      resolve(parent, args) {
        return GuideReview.find({ _id: { $in: parent.replies } });
      },
    },
  }),
});

const TourGuideReviewType = new GraphQLObjectType({
  name: "TourGuideReview",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    rating: { type: GraphQLInt },
    createdAt: { type: TimestampType },
    userId: { type: GraphQLID },
    replies: {
      type: new GraphQLList(TourGuideReviewType),
      resolve(parent, args) {
        return Review.find({ _id: { $in: parent.replies } });
      },
    },
  }),
});

const TourGuideDescriptionType = new GraphQLObjectType({
  name: "TourGuideDescription",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    rating: { type: GraphQLInt },
    createdAt: { type: TimestampType },
    replies: {
      type: new GraphQLList(TourGuideReviewType),
      resolve(parent, args) {
        return Review.find({ _id: { $in: parent.replies } });
      },
    },
  }),
});

const TourGuideProfile = new GraphQLObjectType({
  name: "TourGuideProfile",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    about: { type: GraphQLString },
    uptoPeople: { type: GraphQLString },
    cityId: { type: GraphQLID },
    responseTime: { type: GraphQLString },
    languages: { type: GraphQLList(GraphQLString) },
    profileImage: { type: GraphQLString },
    type: { type: GraphQLString },
    countryId: { type: GraphQLID },
    clientId: { type: GraphQLID },
  }),
});

const TourGuideType = new GraphQLObjectType({
  name: "TourGuide",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    about: { type: GraphQLString },
    uptoPeople: { type: GraphQLString },
    cityId: { type: GraphQLID },
    responseTime: { type: GraphQLString },
    languages: { type: GraphQLList(GraphQLString) },
    profileImage: { type: GraphQLString },
    type: { type: GraphQLString },
    client: { type: ClientType },
    rating: { type: GraphQLInt },
    clientId: { type: GraphQLID },
    countryId: { type: GraphQLID },
    clientInfo: {
      type: ClientType,
      resolve: async (parent) => {
        try {
          const client = await Client.findById(parent?.clientId);
          return client;
        } catch (error) {
          console.error(error?.message);
        }
      },
    },
    guideReview: {
      type: new GraphQLList(TourGuideReviewType),
      resolve: async (parent, args) => {
        // TODO
        return await GuideReview.findById(parent.id);
      },
    },
    city: {
      type: CityForAdd,
      resolve: async (parent, args) => {
        return await City.findOne({ _id: parent.cityId });
      },
    },
    images: {
      type: new GraphQLList(ImageType),
      resolve: async (parent, args) => {
        try {
          return await Images.find({
            clientProfileID: parent.id,
          });
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      },
    },
    tourGuideContribution: {
      type: new GraphQLList(TourGuideContributionType),
      resolve: async (parent, args) => {
        try {
          return await TourGuideContribution.find({
            clientProfileID: parent.id,
          });
        } catch (error) {
          return new Error(`Error From fetch data : ${error}`);
        }
      },
    },
    tourGuideContributionDetail: {
      type: TourGuideContributionDetailType,
      resolve: async (parent, args) => {
        try {
          return await TourGuideContributionDetail.findOne({
            clientProfileID: parent.id,
          });
        } catch (error) {
          return new Error(`Error From fetch data : ${error}`);
        }
      },
    },
    tourGuideReserve: {
      type: TourGuideReserveType,
      resolve: async (parent, args) => {
        try {
          return await TourGuideReserve.findOne({
            clientProfileID: parent.id,
          });
        } catch (error) {
          return new Error(`Error From fetch data : ${error}`);
        }
      },
    },
  }),
});

const ImageInputType = new GraphQLInputObjectType({
  name: "ImageInput",
  fields: {
    image: { type: GraphQLString },
  },
});

const ImageUrlType = new GraphQLObjectType({
  name: "ImageUrlType",
  fields: () => ({
    id: { type: GraphQLID },
    image: { type: GraphQLString },
  }),
});

const ImageType = new GraphQLObjectType({
  name: "Image",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    clientProfileID: { type: GraphQLID },
    contributionId: { type: GraphQLID },
    urls: {
      type: new GraphQLList(ImageUrlType),
    },
    title: { type: GraphQLString },
    contribute: {
      type: TourGuideContributionType,
      resolve: async (parent, args) => {
        try {
          return await TourGuideContribution.findById(parent.contributionId);
        } catch (error) {
          return new Error(error.message);
        }
      },
    },
  }),
});

module.exports = {
  TourSpotType,
  CityType,
  DivisionType,
  CountryType,
  ContinentType,
  DestinationType,
  UserType,
  ClientType,
  ProjectType,
  CityForAdd,
  ReviewType,
  ReviewReplyType,
  GuideReviewType,
  TimestampType,
  TourGuideType,
  TourGuideReviewType,
  TourGuideDescriptionType,
  ImageType,
  ImageInputType,
  TourGuideProfile
};
