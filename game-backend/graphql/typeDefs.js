const { gql } = require("apollo-server");

// your data.
module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    combat_level: Int!
    experience: Int!
    createdAt: String!
    mission_data: MissionData
    quest_data: QuestData
  }
  type MissionData {
    is_on_mission: Boolean
    mission_id: String
    mission_start_time: String
    mission_end_time: String
    missions_completed: [CompletedMission]
  }
  type QuestData {
    is_on_quest: Boolean
    quest_id: String
    quest_start_time: String
    quest_end_time: String
    quests_completed: [CompletedQuest]
  }
  type CompletedMission {
    mission_id: String
  }
  type CompletedQuest {
    quest_id: String
  }
  type Inventory {
    id: ID!
    currency: Currency
    resources: Resources
    ammo_pouch: [AmmoPouch]
    rune_pouch: [RunePouch]
    worn_equipment: Worn
    backpack: Backpack
    bank: Bank
  }
  type Worn {
    equipment: [Equipment]
    worn_equipment_stats: ItemStats
  }
  type Currency {
    gold: Int!
    ether: Int!
    tokens: Int
  }
  type Resources {
    wood: Int!
    stone: Int!
    gems: Int!
  }
  type AmmoPouch {
    item_name: String!
    quantity: Int!
    rarity: String!
    item_type: ItemType!
    item_description: String!
    ranged_attack: Int!
  }
  type RunePouch {
    item_name: String!
    quantity: Int!
    rarity: String!
    item_type: ItemType
    item_description: String!
  }
  type ItemType {
    slot_type: String!
    equipment_type: String!
  }
  type Equipment {
    item_name: String!
    rarity: String!
    item_type: ItemType
    item_description: String!
    item_stats: ItemStats
  }
  type ItemStats {
    attack: Int!
    ranged_attack: Int!
    magic_attack: Int!
    defence: Int!
    hitpoints: Int!
    ranged_defence: Int!
    magic_defence: Int!
  }
  type Backpack {
    equipment: [Equipment]
    misc: [MiscItem]
  }
  type MiscItem {
    item_name: String!
    quantity: Int!
    item_description: String!
    item_type: String!
  }
  type Bank {
    equipment: [Equipment]
    misc: [MiscItem]
  }

  # Mission Type Defs
  type Mission {
    id: ID!
    mission_title: String!
    mission_level: String!
    mission_time: Int!
    mission_description: String!
    mission_attack_style: String
    recommended_armour_type: String
    recommended_attack_style: String
    mission_rewards: Rewards
    users_on_mission: [MissionUser]
  }

  type MissionUser {
    user: String!
    user_combat_level: Int!
    mission_started_time: String
    mission_end_time: String
    mission_time_remaining: String
    user_stats: UserStat
  }

  type UserStat {
    attack: Int
    ranged_attack: Int
    magic_attack: Int
    defence: Int
    hitpoints: Int
    ranged_defence: Int
    magic_defence: Int
  }

  type Rewards {
    currency: Currency
    experience: Int!
    items: [RewardItem]
  }

  type RewardItem {
    reward_potential: Int!
    item: Equipment
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    confirmEmail: String!
  }

  type Query {
    getUsers(userName: String!): User
    getPosts: [Post]
    getPost(postId: ID!): Post
    getInventory(userInventId: ID!): Inventory
    getMissions: [Mission]
    getEquipment(userInventId: ID!): Inventory
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    startMission(userInventId: String, missionId: String): Mission
    handleMissionComplete(
      finishedMission: Boolean
      userInventId: String
      missionId: String
    ): Mission
  }
`;
