import { Post } from "src/posts/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 150,
        nullable: false,
    })
    name: string;

    @Column({ unique: true })
    email: string;
    // @Column()
    // role: string;
    
    @Column()
        age: number;
    @Column()
    password: string;

    @OneToMany(() => Post, post => post.author) // One user can have many posts
    post: Post[];
}
