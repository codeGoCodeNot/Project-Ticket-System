export const homePath = () => "/";

export const ticketsPath = () => "/tickets";
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;
export const ticketsByOrganizationPath = () => "/tickets/organization";

export const signUpPath = () => "/sign-up";
export const signInPath = () => "/sign-in";

export const emailVerificationPath = () => "/email-verification";

export const accountProfilePath = () => "/account/profile";
export const accountPasswordPath = () => "/account/password";
export const accountVerifyEmailPath = () => "/account/verify-email";

export const organizationsPath = () => "/organization";
export const onBoardingPath = () => "/onboarding";
export const organizationCreatePath = () => "/organization/create";
export const selectActiveOrganizationPath = () =>
  "/onboarding/select-active-organization";

export const membershipPath = (organizationId: string) =>
  `/organization/${organizationId}/memberships`;
export const invitationsPath = (organizationId: string) =>
  `/organization/${organizationId}/invitations`;

export const contactAdminPath = () => "/contact-admin";

export const passwordResetPath = () => "/password-reset";
export const passwordForgotPath = () => "/password-forgot";

export const commentEditPath = (ticketId: string, commentId: string) =>
  `/tickets/${ticketId}/edit/${commentId}/edit`;

export const commentAPIPath = (commentId: string) =>
  `/api/comments/${commentId}`;
