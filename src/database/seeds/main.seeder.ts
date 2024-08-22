import { seederBuiltinBoard } from 'src/domain/template/crud-module-template/builtin-board/seeds/builtin-board.seeder';
import dataSource from 'src/config/typeorm.config';

async function main() {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    await seederBuiltinBoard(dataSource);
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    setTimeout(() => process.exit(0), 1000);
  }
}

main().catch((error) => console.error(error));
