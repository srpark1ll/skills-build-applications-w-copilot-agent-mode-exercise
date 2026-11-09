import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase(): Promise<void> {
  await mongoose.connect(connectionString);

  try {
    console.log('Connected to octofit_db');

    // Seed the octofit_db database with test data
    const userData = [
      { username: 'alex-rivera', email: 'alex.rivera@example.com', displayName: 'Alex Rivera' },
      { username: 'jordan-lee', email: 'jordan.lee@example.com', displayName: 'Jordan Lee' },
      { username: 'sam-patel', email: 'sam.patel@example.com', displayName: 'Sam Patel' },
      { username: 'taylor-nguyen', email: 'taylor.nguyen@example.com', displayName: 'Taylor Nguyen' },
      { username: 'casey-morgan', email: 'casey.morgan@example.com', displayName: 'Casey Morgan' },
    ];
    const users = await Promise.all(
      userData.map(({ username, ...profile }) =>
        User.findOneAndUpdate(
          { username },
          { $set: { username, ...profile } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );
    const usersByUsername = new Map(users.map((user) => [user.username, user]));

    const teamData = [
      {
        name: 'Summit Seekers',
        description: 'Trail runners who love a challenging climb.',
        members: ['alex-rivera', 'sam-patel'],
      },
      {
        name: 'City Striders',
        description: 'A friendly crew building consistency together.',
        members: ['jordan-lee', 'taylor-nguyen'],
      },
      {
        name: 'Pace Makers',
        description: 'All-around athletes chasing their next personal best.',
        members: ['casey-morgan', 'alex-rivera', 'jordan-lee'],
      },
    ];
    await Promise.all(
      teamData.map(({ name, description, members }) =>
        Team.findOneAndUpdate(
          { name },
          {
            $set: {
              name,
              description,
              members: members.map((username) => usersByUsername.get(username)!._id),
            },
          },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const workouts = [
      {
        name: 'Easy Morning Run',
        description: 'A relaxed run to build aerobic endurance.',
        difficulty: 'beginner',
        durationMinutes: 30,
        category: 'running',
      },
      {
        name: 'Tempo Intervals',
        description: 'Steady tempo efforts with short recovery breaks.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        category: 'running',
      },
      {
        name: 'Strength Circuit',
        description: 'A full-body circuit using bodyweight movements.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        category: 'strength',
      },
      {
        name: 'Recovery Ride',
        description: 'An easy-paced ride focused on active recovery.',
        difficulty: 'beginner',
        durationMinutes: 45,
        category: 'cycling',
      },
      {
        name: 'Hill Climb Challenge',
        description: 'A demanding hill session for experienced runners.',
        difficulty: 'advanced',
        durationMinutes: 50,
        category: 'running',
      },
    ];
    await Promise.all(
      workouts.map(({ name, ...workout }) =>
        Workout.findOneAndUpdate(
          { name },
          { $set: { name, ...workout } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const activities = [
      {
        id: '650000000000000000000001',
        username: 'alex-rivera',
        type: 'running',
        durationMinutes: 38,
        distanceKilometers: 6.2,
        points: 62,
        daysAgo: 0,
      },
      {
        id: '650000000000000000000002',
        username: 'jordan-lee',
        type: 'cycling',
        durationMinutes: 55,
        distanceKilometers: 18.4,
        points: 74,
        daysAgo: 1,
      },
      {
        id: '650000000000000000000003',
        username: 'sam-patel',
        type: 'strength',
        durationMinutes: 42,
        points: 55,
        daysAgo: 1,
      },
      {
        id: '650000000000000000000004',
        username: 'taylor-nguyen',
        type: 'running',
        durationMinutes: 29,
        distanceKilometers: 4.5,
        points: 45,
        daysAgo: 2,
      },
      {
        id: '650000000000000000000005',
        username: 'casey-morgan',
        type: 'cycling',
        durationMinutes: 70,
        distanceKilometers: 23.1,
        points: 92,
        daysAgo: 2,
      },
      {
        id: '650000000000000000000006',
        username: 'alex-rivera',
        type: 'strength',
        durationMinutes: 32,
        points: 40,
        daysAgo: 3,
      },
    ];
    await Promise.all(
      activities.map(({ id, username, daysAgo, ...activity }) =>
        Activity.findOneAndUpdate(
          { _id: new mongoose.Types.ObjectId(id) },
          {
            $set: {
              ...activity,
              user: usersByUsername.get(username)!._id,
              completedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
            },
          },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const pointsByUsername: Record<string, number> = {
      'alex-rivera': 102,
      'jordan-lee': 74,
      'sam-patel': 55,
      'taylor-nguyen': 45,
      'casey-morgan': 92,
    };
    await Promise.all(
      Object.entries(pointsByUsername).map(([username, points]) =>
        Leaderboard.findOneAndUpdate(
          { user: usersByUsername.get(username)!._id },
          { $set: { user: usersByUsername.get(username)!._id, points } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    console.log('Seeded users, teams, activities, leaderboard entries, and workouts');
    console.log('Database seeding complete');
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
