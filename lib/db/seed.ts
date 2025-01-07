import { cwd } from "process";
import { loadEnvConfig } from "@next/env";

import data from "@/lib/data";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/db/models/user.model";
import Review from "@/lib/db/models/review.model";
import Product from "@/lib/db/models/product.model";
import WebPage from "@/lib/db/models/web-page.model";

loadEnvConfig(cwd());

const main = async () => {
  try {
    const { users, products, reviews, webPages } = data;
    await connectToDatabase(process.env.MONGODB_URI);

    await User.deleteMany();
    const createdUsers = await User.insertMany(users);

    await Product.deleteMany();
    const createdProducts = await Product.insertMany(products);

    await WebPage.deleteMany();
    await WebPage.insertMany(webPages);

    await Review.deleteMany();
    const rws = [];
    for (let i = 0; i < createdProducts.length; i += 1) {
      let x = 0;
      const { ratingDistribution } = createdProducts[i];
      for (let j = 0; j < ratingDistribution.length; j += 1) {
        for (let k = 0; k < ratingDistribution[j].count; k += 1) {
          x += 1;
          rws.push({
            ...reviews.filter((x) => x.rating === j + 1)[
              x % reviews.filter((x) => x.rating === j + 1).length
            ],
            isVerifiedPurchase: true,
            product: createdProducts[i]._id,
            user: createdUsers[x % createdUsers.length]._id,
            updatedAt: Date.now(),
            createdAt: Date.now(),
          });
        }
      }
    }
    const createdReviews = await Review.insertMany(rws);

    console.log({
      createdUsers,
      createdProducts,
      createdReviews,
      message: "Seeded database successfully",
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
