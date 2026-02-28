/**
 * SaveLYF – Secure Configuration
 * ─────────────────────────────────────────────────────────────
 * ⚠ CRITICAL SECURITY:
 *   1. Add this file to .gitignore IMMEDIATELY
 *   2. NEVER commit this file to any repository
 *   3. Change all passwords below before going live
 *
 * .gitignore entry:   config.js
 *
 * Credentials are NOT displayed anywhere in the application UI.
 * Each role supports TWO passwords — rotate without downtime.
 * ─────────────────────────────────────────────────────────────
 */

window.SAVELYF_CONFIG = {

  /* ── Firebase Project ── */
  apiKey:            "AIzaSyDAn-cWd18DjxCWiYtD3ohbpNNblVSpMAA",
  authDomain:        "savelife-bf637.firebaseapp.com",
  projectId:         "savelife-bf637",
  storageBucket:     "savelife-bf637.firebasestorage.app",
  messagingSenderId: "658247946038",
  appId:             "1:658247946038:web:79beeb596be480cc1cad97",

  /* ── Admin Portal Credentials ──────────────────────────────
   * Two passwords per role — both work simultaneously.
   * users:     accepted usernames for this role
   * passwords: both passwords accepted (rotate without locking anyone out)
   * ──────────────────────────────────────────────────────── */
  adminCredentials: {

    official: {
      users:     ['official@gov.bw', 'govofficer'],
      passwords: ['GovBW@2024!Secure', 'GovBW@2024!Backup']
    },

    engineer: {
      users:     ['engineer@gov.bw', 'rdsengineer'],
      passwords: ['RdsEng@BW2024!01', 'RdsEng@BW2024!02']
    },

    analyst: {
      users:     ['analyst@gov.bw', 'dataanalyst'],
      passwords: ['Analyst@BW2024!A', 'Analyst@BW2024!B']
    },

    super: {
      users:     ['superadmin@savelyf.bw', 'savelyf_super'],
      passwords: ['SuperSLYF@2024!X1', 'SuperSLYF@2024!X2']
    }

  }

};
