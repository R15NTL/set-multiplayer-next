import React from "react";
// Next
import Head from "next/head";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Components
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// Features
import SetTable from "@/features/setTable/SetTable";

HowToPlay.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);

export default function HowToPlay() {
  return (
    <>
      <Head>
        <title>How to Play Set - The Complete Guide</title>
        <meta
          name="description"
          content="A comprehensive guide on how to play the Set card game, including rules, visuals, and strategies. Master the game of Set in minutes!"
        />
        <meta
          name="keywords"
          content="Set, Set game, how to play Set, Set card game rules, Set card game tutorial, Set game strategies"
        />
        <meta
          property="og:title"
          content="How to Play Set - The Complete Guide"
        />
        <meta
          property="og:description"
          content="A comprehensive guide on how to play the Set card game, including rules, visuals, and strategies. Master the game of Set in minutes!"
        />
      </Head>
      <Card className=" p-5 my-2  mx-auto w-full max-w-2xl bg-slate-900 border-none">
        <article className="grid gap-5">
          <h1 className="text-xl font-medium tracking-tight">
            How to Play: Set
          </h1>
          <Separator />

          <section className="grid gap-2">
            <h2 className="text-muted text-lg font-medium">Introduction</h2>
            <p className="text-sm">
              Set is a captivating card game where the objective is to identify
              groups of three cards, known as 'Sets', based on certain
              attributes.
            </p>
            <p className="text-sm">
              Your goal: Discover as many 'Sets' as possible.
            </p>
          </section>

          <section className="grid gap-2">
            <h2 className="text-muted text-lg font-medium">Setup</h2>
            <p className="text-sm">
              When you start the game, cards are dealt and presented in a 3x4
              grid.
            </p>
            <p className="text-sm">
              If more cards are needed, additional rows will be added
              automatically to the grid.
            </p>
          </section>

          <section className="grid gap-2">
            <h2 className="text-muted text-lg font-medium">
              Card Features and Variations
            </h2>
            <p className="text-sm">
              Each card has four attributes: Color, Shape, Quantity, and
              Shading. Each attribute has three different variations you'll need
              to pay attention to.
            </p>
          </section>

          <section className="grid gap-2">
            <h2 className="text-muted text-lg font-medium">
              Identifying a 'Set'
            </h2>
            <p className="text-sm">
              A 'Set' comprises three cards that, for each attribute, must
              adhere to one of the two rules:
            </p>
            <ul className="list-disc pl-5 mb-1 text-sm">
              <li className="mb-2">
                <span className="font-medium">Uniformity:</span> All three cards
                have the <span className="italic">same</span> characteristic.
                For instance, all three cards might be red, have solid shading,
                or have two shapes.
              </li>
              <li>
                <span className="font-medium">Variety:</span> The three cards
                have <span className="italic">different</span> characteristics
                for a specific attribute. For instance, if looking at color, one
                card might be red, the second green, and the third purple.
              </li>
            </ul>
            <p className="text-sm">
              Remember, these rules must apply simultaneously across{" "}
              <span className="italic">all</span> attributes for a collection of
              cards to be considered a 'Set'.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-muted font-medium text-lg">Visual Examples:</h2>

            <div className="grid gap-2">
              <h4 className="text-sm font-medium text-emerald-500">
                Valid Set:
              </h4>
              <Card className="max-w-sm p-3">
                <SetTable
                  data={[
                    {
                      color: "red",
                      shape: "oval",
                      quantity: 1,
                      shade: "solid",
                      arrId: 0,
                    },
                    {
                      color: "red",
                      shape: "oval",
                      quantity: 2,
                      shade: "solid",
                      arrId: 1,
                    },
                    {
                      color: "red",
                      shape: "oval",
                      quantity: 3,
                      shade: "solid",
                      arrId: 3,
                    },
                  ]}
                />
              </Card>
              <p className="text-sm pl-3 my-1 border-l-2">
                Explanation: All cards are Red, all are Solid, and all have
                Ovals. The quantity is also different for each, which adheres to
                the "Variety" rule for the number attribute.
              </p>
            </div>

            <div className="grid gap-2">
              <h4 className="text-sm font-medium text-rose-400">
                Invalid Set:
              </h4>
              <Card className="max-w-sm p-3">
                <SetTable
                  data={[
                    {
                      color: "red",
                      shape: "oval",
                      quantity: 1,
                      shade: "solid",
                      arrId: 0,
                    },
                    {
                      color: "green",
                      shape: "oval",
                      quantity: 2,
                      shade: "solid",
                      arrId: 1,
                    },
                    {
                      color: "red",
                      shape: "oval",
                      quantity: 3,
                      shade: "shaded",
                      arrId: 3,
                    },
                  ]}
                />
              </Card>
              <p className="text-sm my-1 pl-3 border-l-2">
                Explanation: Here, the color attribute neither adheres to
                Uniformity (all same) nor Variety (all different). Similarly,
                shading is mixed between Solid and Striped, making this
                collection invalid.
              </p>
            </div>

            <div className="grid gap-2">
              <h4 className="text-sm font-medium text-emerald-500">
                Valid Set:
              </h4>
              <Card className="max-w-sm p-3">
                <SetTable
                  data={[
                    {
                      color: "green",
                      shape: "diamond",
                      quantity: 1,
                      shade: "shaded",
                      arrId: 2,
                    },
                    {
                      color: "red",
                      shape: "diamond",
                      quantity: 2,
                      shade: "shaded",
                      arrId: 3,
                    },
                    {
                      color: "purple",
                      shape: "diamond",
                      quantity: 3,
                      shade: "shaded",
                      arrId: 4,
                    },
                  ]}
                />
              </Card>
              <p className="text-sm my-1 pl-3 border-l-2">
                Explanation: The colors are all different, but they all have
                Striped Diamonds. The numbers also differ, making this a valid
                set.
              </p>
            </div>

            {/* Invalid Set Example 2 */}
            <div className="grid gap-2">
              <h4 className="text-sm font-medium text-rose-400">
                Invalid Set:
              </h4>
              <Card className="max-w-sm p-3">
                <SetTable
                  data={[
                    {
                      color: "purple",
                      shape: "oval",
                      quantity: 1,
                      shade: "solid",
                      arrId: 5,
                    },
                    {
                      color: "green",
                      shape: "oval",
                      quantity: 2,
                      shade: "shaded",
                      arrId: 6,
                    },
                    {
                      color: "purple",
                      shape: "diamond",
                      quantity: 3,
                      shade: "solid",
                      arrId: 7,
                    },
                  ]}
                />
              </Card>
              <p className="text-sm my-1 pl-3 border-l-2">
                Explanation: Here, the cards have mixed attributes with neither
                all same nor all different characteristics for shape, making
                this set invalid.
              </p>
            </div>
          </section>
        </article>
      </Card>
    </>
  );
}
