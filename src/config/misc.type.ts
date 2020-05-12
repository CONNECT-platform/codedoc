import { GithubBtnActions } from '../components/misc/github';

/**
 *
 * Represents GitHub configuration of the project.
 *
 */
export interface GithubConfig {
  /**
   *
   * GitHub username
   *
   */
  user: string;

  /**
   *
   * GitHub repository name
   *
   */
  repo: string;

  /**
   *
   * Action of the default GitHub button in header. Default is `"Star"`.
   *
   */
  action?: GithubBtnActions;

  /**
   *
   * Whether or not to show the count of stars/follows/etc on the default
   * GitHub button in the header. Default is `true`.
   *
   */
  count?: boolean;

  /**
   *
   * Whether or not to use a large size for the default GitHub button in the header.
   * Default is `false`.
   *
   */
  large?: boolean;

  /**
   *
   * Whether to use the standard GitHub icon for the default GitHub button
   * in the header, or to use action-specific icons. Default is `true`.
   *
   */
  standardIcon?: boolean;
}


/**
 *
 * Represents the Gitter configuration of the project.
 *
 */
export interface GitterConfig {
  /**
   *
   * The gitter room id of the project.
   *
   */
  room: string;
}
