import {
  defineType,
  defineField,
  defineArrayMember,
  InferValue,
} from "@sanity-typed/types";

export type PageHeader = InferValue<typeof pageHeader>;

const pageHeaderItem = defineArrayMember({
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isMenu",
      title: "Is Menu",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
      hidden: ({ parent }: { parent: { isMenu: boolean } }) => parent.isMenu,
    }),
    defineField({
      name: "subMenu",
      title: "Sub Menu",
      type: "object",
      fields: [
        defineField({
          name: "subMenuItems",
          title: "Sub Menu Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "link",
                  title: "Link",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          hidden: ({ parent }: { parent: { isMenu: boolean } }) =>
            !parent.isMenu,
        }),
      ],
    }),
  ],
});

export const pageHeader = defineType({
  type: "document",
  name: `page-header-singleton`,
  title: "Page Header",
  fields: [
    defineField({
      name: "joinButtonText",
      title: "Join Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subMenuItems",
      title: "Sub Menu Items",
      type: "array",
      of: [pageHeaderItem],
    }),
    defineField({
      name: "menuItems",
      title: "Menu Items",
      type: "array",
      of: [pageHeaderItem],
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
    }),
  ],
});
