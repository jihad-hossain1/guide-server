const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
} = require("graphql");

const TourGuide = require("../../models/TourGuide");
const {
  TourGuideType,
  ImageType,
  ImageInputType,
  TourGuideProfile,
} = require("../../typeDef/typeDef");
const {
  TourGuideContributionType,
  TourPlaceContributeInput,
  TourGuideContributionDetailType,
  IncludesInput,
  NotIncludesInput,
  AdditionalInfoInput,
  TourGuideReserveType,
  PersonPicInputType,
  StartTimeInputType,
  StartTimeType,
  PersonPicType,
} = require("../../typeDef/extraTypeDef");
const Images = require("../../models/Images");
const TourGuideContribution = require("../../models/TourGuideContribution");
const {
  TourGuideContributionDetail,
} = require("../../models/TourGuideContributionDetail");
const TourGuideReserve = require("../../models/TourGuideReserve");
const {
  validateFieldMaxLength,
  fieldValidate,
  validateUptoNumber,
} = require("../../helpers/validateField");
const Client = require("../../models/Client");

const addProfileImage = {
  type: TourGuideProfile,
  args: {
    profileImage: { type: GraphQLString },
    id: { type: GraphQLID },
  },

  resolve: async(_, { profileImage, id }) => {
    
    try {
      fieldValidate(profileImage, "Profile Image");
      fieldValidate(id, "ID");

      const addProfileImage = await TourGuide.findByIdAndUpdate(id, { profileImage }, { new: true });

      return addProfileImage
    } catch (error) {
      throw new Error(error.message)
    }
  }
};

const addTourGuideProfile = {
  type: TourGuideProfile,
  args: {
    description: { type: GraphQLString },
    about: { type: GraphQLString },
    clientId: { type: GraphQLID },
    cityId: { type: GraphQLID },
    countryId: { type: GraphQLID },
    responseTime: { type: GraphQLString },
    languages: { type: GraphQLList(GraphQLString) },
    profileImage: { type: GraphQLString },
    type: { type: GraphQLString },
  },

  resolve: async (parent, args) => {
    const {
      description,
      about,
      clientId,
      cityId,
      responseTime,
      languages,
      profileImage,
      type,
      countryId,
    } = args;

    try {
      validateFieldMaxLength(description, "Description", 5, 1500);
      validateFieldMaxLength(about, "about", 5, 300);
      validateFieldMaxLength(type, "Type", 5, 30);
      // validateUptoNumber(uptoPeople, "Upto People", 1, 20);
      validateUptoNumber(Number(responseTime), "Response Time", 1, 10);
      fieldValidate(countryId, "Country Name");
      fieldValidate(cityId, "City Name");
      fieldValidate(type, "TourGuide Type");

      const existData = await TourGuide.findOne({ clientId: clientId });

      if (existData) {
        throw new Error("Your Profile Already Exist, Update your data");
      }

      const findClient = await Client.findById(clientId)

      const tourGuideProfile = new TourGuide({
        description,
        // uptoPeople,
        clientId,
        cityId,
        responseTime,
        languages,
        profileImage,
        type,
        countryId,
        about,
        slug: findClient.slug
      });

      const saved = await tourGuideProfile.save();

      return saved;
    } catch (error) {
      return new Error(error.message);
    }
  },
};

const uploadTourImages = {
  type: ImageType,
  args: {
    clientId: { type: GraphQLID },
    clientProfileID: { type: GraphQLID },
    contributionId: { type: GraphQLID },
    title: { type: GraphQLString },
    urls: { type: GraphQLList(ImageInputType) },
  },
  resolve: async (
    parent,
    { clientId, clientProfileID, contributionId, title, urls }
  ) => {
    try {
      console.log(urls);

      fieldValidate(title, "Image title");
      fieldValidate(contributionId, "Contribution");

      if (!urls || urls?.length == 0) {
        throw new Error("Please Upload Minimum One image1");
      }

      const upImage = new Images({
        clientId,
        clientProfileID,
        urls,
        title,
        contributionId,
      });
      const saved = await upImage.save();
      return saved;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const updateTourGuideProfile = {
  type: TourGuideType,
  args: {
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    about: { type: GraphQLString },
    clientId: { type: GraphQLID },
    cityId: { type: GraphQLID },
    countryId: { type: GraphQLID },
    responseTime: { type: GraphQLString },
    languages: { type: GraphQLList(GraphQLString) },
    profileImage: { type: GraphQLString },
    type: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    try {
      // validateFieldMaxLength(args.description, "Description", 20, 1500);
      // validateFieldMaxLength(args.about, "about", 20, 300);
      // validateFieldMaxLength(args.type, "Type", 5, 30);
      // // validateUptoNumber(args.uptoPeople, "Upto People", 1, 20);
      // validateUptoNumber(Number(args.responseTime), "Response Time", 1, 10);

      const updateGuide = await TourGuide.findByIdAndUpdate(
        args.id,
        {
          $set: {
            description: args.description || undefined,
            clientId: args.clientId || undefined,
            cityId: args.cityId || undefined,
            responseTime: args.responseTime || undefined,
            languages: args.languages || undefined,
            profileImage: args.profileImage || undefined,
            type: args.type || undefined,
            countryId: args.countryId || undefined,
            about: args.about || undefined,
          },
        },
        {
          new: true,
        }
      );

      return updateGuide;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};

const addGuideTourplace = {
  type: TourGuideContributionType,
  args: {
    tourPlaceId: { type: GraphQLID },
    clientProfileID: { type: GraphQLID },
    title: { type: GraphQLString },
    about: { type: GraphQLString },
    price: { type: GraphQLInt },
    contribute: { type: GraphQLList(TourPlaceContributeInput) },
  },
  resolve: async (parent, args) => {
    const { title } = args;
    try {
      // console.log(args);
      const existPlace = await TourGuideContribution.findOne({
        tourPlaceId: args.tourPlaceId,
        clientProfileID: args.clientProfileID,
      });
      if (existPlace) {
        return new Error("Tour place are already exist try another tour place");
      }

      // if (existPlace.title == title.trim()) {
      //   return new Error("Title Already Exist");
      // }

      const tourGuideContribute = new TourGuideContribution(args);
      const saved = await tourGuideContribute.save();

      const updatePlace = await TourGuide.findOneAndUpdate(
        { _id: args.clientProfileID },
        {
          $push: {
            guidePlaces: args.tourPlaceId,
          },
        },
        { new: true }
      );

      console.log(updatePlace);

      return saved;
      // console.log(existPlace);
    } catch (error) {
      console.log("🚀 ~ resolve: ~ error:", error.message);
      throw new Error(error.message);
    }
  },
};

const updateTourGuidePlce = {
  type: TourGuideContributionType,
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    about: { type: GraphQLString },
    price: { type: GraphQLInt },
    tourPlaceId: { type: GraphQLID },
    clientProfileID: { type: GraphQLID },
    contribute: { type: GraphQLList(TourPlaceContributeInput) },
  },
  resolve: async (parent, args) => {
    try {
      // const existPlace = await TourGuide.findOne({
      //   clientId: args.clientProfileID,
      // });

      // const findOne = existPlace?.guidePlaces?.find(
      //   (item) => item == args.tourPlaceId
      // );

      // const existPlace = await TourGuide.findById(args.clientProfileID);

      // const _filter = existPlace?.guidePlaces?.filter(
      //   (item) => item != args.tourPlaceId
      // )

      // console.log(_filter, "places");

      // if (!_filter) {
      //   return new Error("Tour place are already exist try another tour place");
      // }
      const updatePlace = await TourGuideContribution.findByIdAndUpdate(
        args.id,
        {
          $set: {
            title: args.title || undefined,
            about: args.about || undefined,
            price: +args.price || undefined,
            tourPlaceId: args.tourPlaceId || undefined,
            clientProfileID: args.clientProfileID || undefined,
            contribute: args.contribute || undefined,
          },
        },
        {
          new: true,
        }
      );

      return updatePlace;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const addTourGuideContributionDetail = {
  type: TourGuideContributionDetailType,
  args: {
    clientProfileID: { type: GraphQLID },
    notice: { type: GraphQLString },
    includes: {
      type: new GraphQLList(IncludesInput),
    },
    notIncludes: {
      type: new GraphQLList(NotIncludesInput),
    },
    additionalInfo: {
      type: new GraphQLList(AdditionalInfoInput),
    },
  },
  resolve: async (parent, args) => {
    try {
      const alreadyInfoAdd = await TourGuideContributionDetail.findOne({
        clientProfileID: args?.clientProfileID,
      });
      if (alreadyInfoAdd) {
        return new Error(
          `You are already added TourGuideContributionDetail information! if you want to more info added go to TourGuideContributionDetail update section...`
        );
      }
      const tourGuideContributeDetail = new TourGuideContributionDetail(args);
      const saved = await tourGuideContributeDetail.save();
      return saved;
      // console.log(existPlace);
    } catch (error) {
      return new Error(`Error adding TourGuideContributionDetails: ${error}`);
    }
  },
};

const addTourGuideReserve = {
  type: TourGuideReserveType,
  args: {
    clientProfileID: { type: GraphQLID },
    personPic: {
      type: PersonPicInputType,
    },
    startTime: {
      type: new GraphQLList(StartTimeInputType),
    },
    guideContribution: {
      type: GraphQLID,
    },
  },

  resolve: async (parent, args) => {
    const { guideContribution, startTime, personPic, clientProfileID } = args;
    try {
      console.log(args);

      if (startTime?.length == 0) {
        return new Error("start time are required");
      }

      fieldValidate(guideContribution, "Guide Contribution");

      // const uptoPeople = await TourGuide.findById(args?.clientProfileID);

      // const upP =
      //   parseInt(uptoPeople.uptoPeople) === args.personPic?.totalPerson;

      // if (!upP) {
      //   return new Error(
      //     "uptopeople and total person are not match please fill the uptopeople = totalperson"
      //   );
      // }

      // console.log(upP);

      const alreadyInfoAdd = await TourGuideReserve.find({
        clientProfileID: args?.clientProfileID,
        guideContribution: args.guideContribution,
      });

      if (alreadyInfoAdd.length !== 0) {
        return new Error(
          `You are already added TourGuideReserve information! if you want to more info added go to TourGuideReserve update section...`
        );
      }

      const tourGuideReserveSaved = new TourGuideReserve({
        clientProfileID,
        guideContribution,
        personPic,
        startTime,
      });
      const saved = await tourGuideReserveSaved.save();
      return saved;
    } catch (error) {
      return new Error(error.message);
    }
  },
};

const updateGuideReserve = {
  type: TourGuideReserveType,
  args: {
    clientProfileID: { type: GraphQLID },
    personPic: {
      type: PersonPicInputType,
    },
    startTime: {
      type: new GraphQLList(
        new GraphQLInputObjectType({
          name: "StartTimeInputUpType",
          fields: {
            id: { type: GraphQLID },
            timePic: { type: GraphQLString },
          },
        })
      ),
    },
    guideContribution: {
      type: GraphQLID,
    },
    id: { type: GraphQLID },
  },

  resolve: async (_, args) => {
    const { clientProfileID, id, startTime, guideContribution, personPic } =
      args;
    try {
      // const findDuplicate = await TourGuideReserve.findOne({
      //   clientProfileID,
      //   guideContribution,
      // });

      // if (findDuplicate) {
      //   throw new Error(
      //     "Guide Contribution already exists for this client profile."
      //   );
      // }

      const updateFields = { clientProfileID };

      if (personPic) {
        updateFields.personPic = personPic;
      }
      if (startTime) {
        updateFields.startTime = startTime;
      }
      if (guideContribution) {
        // if (!guideContribution) {
        //   throw new Error("Guide Contribution is required.");
        // }

        // const findDuplicate = await TourGuideReserve.findOne({
        //   clientProfileID,
        //   guideContribution,
        // });

        // if (findDuplicate) {
        //   throw new Error(
        //     "Guide Contribution already exists for this client profile."
        //   );
        // }

        updateFields.guideContribution = guideContribution;
      }

      const update = await TourGuideReserve.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );

      if (!update) {
        throw new Error("Failed to update the guide reservation.");
      }

      return update;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};


module.exports = {
  addTourGuideProfile,
  updateTourGuideProfile,
  uploadTourImages,
  addGuideTourplace,
  addTourGuideContributionDetail,
  addTourGuideReserve,
  updateTourGuidePlce,
  updateGuideReserve,
  addProfileImage,
};
