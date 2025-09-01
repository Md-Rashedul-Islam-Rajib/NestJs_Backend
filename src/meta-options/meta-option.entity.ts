import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: 'json' })
  metaValue: Record<string, any>;

  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;

  @OneToOne(() => Post,
    post => post.metaOption,// Inverse side of the relationship
    { onDelete: 'CASCADE' })  // Delete meta option if the post is deleted
  @JoinColumn()
  post: Post;
}