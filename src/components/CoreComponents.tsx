import { default as CC } from '../../plugins/boldlypress-core/src/components/CoreComponents';
/**
 * Core components are exposed from here to make importing into MDX files simple and easy,
 * and reducing the impact of refactoring. This approach exposes useful core components to
 * MDX files with a single import that never changes:
 *
 * ```
 * import CoreComponents from "../components/CoreComponents"
 * ```
 *
 * This insulates components used in MDX files from changes to core component locations.
 *
 * Otherwise, if you moved a component in core, then you'd have to update imports in all
 * MDX files that reference it to use the new location because, in VSCode, imports in MDX files
 * aren't automatically updated like imports are in TS and TSX files.
 */
const CoreComponents = CC;
export default CoreComponents;
