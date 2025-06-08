
import { useState } from "react";
import type { Article, Event, Category, Author } from "@/types/database";

export const useAdminDialogs = () => {
  const [articleDialogOpen, setArticleDialogOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [authorDialogOpen, setAuthorDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | undefined>();
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [editingAuthor, setEditingAuthor] = useState<Author | undefined>();

  const openArticleDialog = (article?: Article) => {
    setEditingArticle(article);
    setArticleDialogOpen(true);
  };

  const openEventDialog = (event?: Event) => {
    setEditingEvent(event);
    setEventDialogOpen(true);
  };

  const openCategoryDialog = (category?: Category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const openAuthorDialog = (author?: Author) => {
    setEditingAuthor(author);
    setAuthorDialogOpen(true);
  };

  const closeAllDialogs = () => {
    setArticleDialogOpen(false);
    setEventDialogOpen(false);
    setCategoryDialogOpen(false);
    setAuthorDialogOpen(false);
    setEditingArticle(undefined);
    setEditingEvent(undefined);
    setEditingCategory(undefined);
    setEditingAuthor(undefined);
  };

  return {
    // Dialog states
    articleDialogOpen,
    eventDialogOpen,
    categoryDialogOpen,
    authorDialogOpen,
    editingArticle,
    editingEvent,
    editingCategory,
    editingAuthor,
    // Dialog controls
    setArticleDialogOpen,
    setEventDialogOpen,
    setCategoryDialogOpen,
    setAuthorDialogOpen,
    openArticleDialog,
    openEventDialog,
    openCategoryDialog,
    openAuthorDialog,
    closeAllDialogs,
  };
};
