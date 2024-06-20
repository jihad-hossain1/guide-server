// const { TourSpotType } = require("./typeDef");
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

const TourGuideContribution = require("../models/TourGuideContribution");
const TourSpot = require("../models/TourSpot");

const TourPlaceContributeInput = new GraphQLInputObjectType({
  name: "TourContributorInput",
  fields: {
    picTime: { type: GraphQLString },
    contributeTitle: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

const IncludesInput = new GraphQLInputObjectType({
  name: "IncludesInputType",
  fields: {
    include: { type: GraphQLString },
  },
});
const NotIncludesInput = new GraphQLInputObjectType({
  name: "NotIncludesInputType",
  fields: {
    notInclude: { type: GraphQLString },
  },
});
const AdditionalInfoInput = new GraphQLInputObjectType({
  name: "AdditionalInfoType",
  fields: {
    info: { type: GraphQLString },
  },
});

const TourSpotType = new GraphQLObjectType({
  name: "TourSpotstype",
  fields: () => ({
    id: { type: GraphQLID },

    name: { type: GraphQLString },

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
  }),
});

const TourPlaceContributeType = new GraphQLObjectType({
  name: "TourContributorType",
  fields: () => ({
    id: { type: GraphQLID },
    picTime: { type: GraphQLString },
    contributeTitle: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});

const TourGuideContributionType = new GraphQLObjectType({
  name: "TourGuideContributions",
  fields: () => ({
    id: { type: GraphQLID },
    tourPlaceId: { type: GraphQLID },
    clientProfileID: { type: GraphQLID },
    title: { type: GraphQLString },
    about: { type: GraphQLString },
    price: { type: GraphQLInt },
    contribute: {
      type: new GraphQLList(TourPlaceContributeType),
    },
    info: {
      type: TourSpotType,
      resolve: async (parent, args) => {
        return await TourSpot.findOne({ _id: parent?.tourPlaceId });
      },
    },
  }),
});

const TourGuideContributionDetailType = new GraphQLObjectType({
  name: "TourGuideContributionDetail",
  fields: () => ({
    id: { type: GraphQLID },
    clientProfileID: { type: GraphQLID },
    notice: { type: GraphQLString },
    includes: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "IncludeInfo",
          fields: () => ({
            id: { type: GraphQLID },
            include: { type: GraphQLString },
          }),
        })
      ),
    },
    notIncludes: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "NotIncludeInfo",
          fields: () => ({
            id: { type: GraphQLID },
            notInclude: { type: GraphQLString },
          }),
        })
      ),
    },
    additionalInfo: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "AdditionalInfo",
          fields: () => ({
            id: { type: GraphQLID },
            info: { type: GraphQLString },
          }),
        })
      ),
    },
  }),
});

const PersonPicInputType = new GraphQLInputObjectType({
  name: "PersonPicInputType",
  fields: {
    adult: { type: GraphQLInt },
    children: { type: GraphQLInt },
    infant: { type: GraphQLInt },
    totalPerson: { type: GraphQLInt },
  },
});
const PersonPicType = new GraphQLObjectType({
  name: "PersonPicTypeF",
  fields: {
    id: { type: GraphQLID },
    adult: { type: GraphQLInt },
    children: { type: GraphQLInt },
    infant: { type: GraphQLInt },
    totalPerson: { type: GraphQLInt },
  },
});

const StartTimeType = new GraphQLObjectType({
  name: "StartTimeTypeF",
  fields: {
    id: { type: GraphQLID },
    timePic: { type: GraphQLString },
  },
});
const StartTimeInputType = new GraphQLInputObjectType({
  name: "StartTimeInputType",
  fields: {
    timePic: { type: GraphQLString },
  },
});

const TourGuideReserveType = new GraphQLObjectType({
  name: "TourGuideReserve",
  fields: () => ({
    id: { type: GraphQLID },

    clientProfileID: { type: GraphQLID },

    guideContribution: { type: GraphQLID },

    datePic: { type: GraphQLString },

    personPic: {
      type: new GraphQLObjectType({
        name: "PersonPicType",
        fields: () => ({
          id: { type: GraphQLID },
          adult: { type: GraphQLInt },
          children: { type: GraphQLInt },
          infant: { type: GraphQLInt },
          totalPerson: { type: GraphQLInt },
        }),
      }),
    },

    startTime: {
      type: GraphQLList(
        new GraphQLObjectType({
          name: "StartTimeType",
          fields: () => ({
            id: { type: GraphQLID },
            timePic: { type: GraphQLString },
          }),
        })
      ),
    },

    contribution: {
      type: TourGuideContributionType,
      resolve: async (parent, args) => {
        console.log(parent.clientProfileID);
        try {
          const contribute = await TourGuideContribution.find({
            clientProfileID: parent.clientProfileID,
          });

          const findUnique = contribute?.find(
            (item) => item.id == parent.guideContribution
          );

          console.log(findUnique);
          return findUnique;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  }),
});

module.exports = {
  TourGuideContributionType,
  TourPlaceContributeInput,
  TourGuideContributionDetailType,
  IncludesInput,
  NotIncludesInput,
  AdditionalInfoInput,
  TourGuideReserveType,
  StartTimeInputType,
  PersonPicInputType,
  PersonPicType,
  StartTimeType,
};
