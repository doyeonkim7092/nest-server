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
    // 원한다면 더 집어 넣으세요
  ];

  // 로직에 대한 개선은 언제나 가능
  for (const item of seedData) {
    const existingBoard = await builtInRepository.findOne({
      where: { writer: item.writer, body: item.body },
    });
    if (!existingBoard) {
      await builtInRepository.save(builtInRepository.create(item));
    }
  }
};
