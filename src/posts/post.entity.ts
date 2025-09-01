import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from './enums/postStatus.enum';
import { PostType } from './enums/postType.enum';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: PostType.BLOG,
  })
  postType: PostType;

  @Column({
    type: 'enum',
    enum: PostStatus,
    nullable: false,
    default: PostStatus.DRAFT,
  })
  postStatus: PostStatus;

  @Column({ unique: true, nullable: false })
  slug: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'timestamp', nullable: true })
  publishOn?: Date;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @OneToOne(() => MetaOption,
    (MetaOption) => MetaOption.post, // inverse side of the relationship
    {
    cascade: true, // Automatically persist related entity
    eager: true, // Automatically load related entity in the response
    nullable: true,
    onDelete: 'CASCADE' // Delete meta option if the post is deleted
  })
  @JoinColumn() // Owning side of the relationship
  metaOption?: MetaOption; // Changed to singular and made optional

  @ManyToOne(() => User, user => user.post, { eager: true }) // Many posts can belong to one user
  author: User;
}
