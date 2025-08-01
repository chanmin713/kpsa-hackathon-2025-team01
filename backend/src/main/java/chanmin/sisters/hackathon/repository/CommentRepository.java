package chanmin.sisters.hackathon.repository;

import chanmin.sisters.hackathon.entity.Board;
import chanmin.sisters.hackathon.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoard(Board board);
}
