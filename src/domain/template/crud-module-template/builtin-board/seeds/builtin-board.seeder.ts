import { DataSource } from 'typeorm';
import { BuiltinBoard } from '../entities/builtin-board.entity';

export const seederBuiltinBoard = async (dataSource: DataSource) => {
  const builtInRepository = dataSource.getRepository(BuiltinBoard);

  const seedData = [
    {
      category: '일상 이야기',
      writer: '홍길동',
      birth: new Date('1990-01-01'),
      phone: '01012345678',
      body: '첫 번째 게시글입니다.',
      isActivated: true,
    },
    // is you wanna more ? go on !
  ];

  for (const item of seedData) {
    const existingBoard = await builtInRepository.findOne({
      where: { writer: item.writer, body: item.body },
    });
    if (!existingBoard) {
      await builtInRepository.save(builtInRepository.create(item));
    }
  }
};
