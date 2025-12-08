// src/context/SidebarContext.js
import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedJournalId, setSelectedJournalId] = useState(null);

  const switchToEditorial = (journalId) => {
    setActiveView('editorial');
    setSelectedJournalId(journalId);
    localStorage.setItem('journalId', journalId);
  };

  const switchToPapers = (journalId) => {
    setActiveView('papers');
    setSelectedJournalId(journalId);
    localStorage.setItem('journalId', journalId);
  };

  const switchToDashboard = () => {
    setActiveView('dashboard');
    setSelectedJournalId(null);
  };

  const setJournalInfo = (journal) => {
    setSelectedJournal(journal);
  };

  return (
    <SidebarContext.Provider value={{
      activeView,
      selectedJournal,
      selectedJournalId,
      switchToEditorial,
      switchToPapers,
      switchToDashboard,
      setJournalInfo
    }}>
      {children}
    </SidebarContext.Provider>
  );
};