import { cwd } from "process";
import { loadEnvConfig } from "@next/env";

import data from "@/lib/data";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/db/models/user.model";
import Product from "@/lib/db/models/product.model";

loadEnvConfig(cwd());

const main = async () => {
  try {
    const { users, products } = data;
    await connectToDatabase(process.env.MONGODB_URI);

    await User.deleteMany();
    const createdUsers = await User.insertMany(users);

    await Product.deleteMany();
    const createdProducts = await Product.insertMany(products);

    console.log({
      createdUsers,
      createdProducts,
      message: "Seeded database successfully",
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
