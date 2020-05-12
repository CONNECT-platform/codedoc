import { Compiled } from '@connectv/sdh';
import { File } from 'rxline/fs';

/**
 *
 * Denotes a post-processor function post-processing a generated HTML file
 *
 */
export type PostProcessor = (html: HTMLDocument, file: File<Compiled>) => void | Promise<void>;
